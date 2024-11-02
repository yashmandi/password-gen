const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const User = require("./models/userModel");
const Password = require("./models/passwordModel");
const JWT_SECRET =
  process.env.JWT_SECRET || "fallback_secret_key_not_for_production";

// Load environment variables
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envPath) });

// CORS configuration
const allowedOrigins = [
  "https://passprompt.vercel.app", // Remove trailing slash
  "http://localhost:5173",
  "http://localhost:3000",
  "https://passgen-api.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // For development/testing - allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Add connection error handling
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware for protecting routes
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

app.post("/", auth, (req, res) => {
  res.send("Hello, World!");
});

// Register a new user
app.post("/register", async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ fullName, email, password, phone });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login an existing user
app.post("/login", async (req, res) => {
  console.log("Login request received:", { email: req.body.email });

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing credentials");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Finding user...");
    const user = await User.findOne({ email }).maxTimeMS(5000); // Add timeout for MongoDB query

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Generating token...");
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful for user:", email);
    res.json({
      token,
      user: {
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    // Check for specific MongoDB errors
    if (err.name === "MongoTimeoutError") {
      return res.status(503).json({
        message: "Database operation timed out. Please try again.",
      });
    }

    res.status(500).json({
      message: "Server error",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
});

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Save a password (protected route)
app.post("/passwords", auth, async (req, res) => {
  const { website, username, password } = req.body;

  if (!website || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPassword = new Password({
      website,
      username,
      password,
      user: req.user.id,
    });

    const savedPassword = await newPassword.save();

    res.status(201).json({
      id: savedPassword._id,
      website: savedPassword.website,
      username: savedPassword.username,
      password: savedPassword.password,
    });
  } catch (err) {
    console.error("Error saving password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Edit a saved password (protected route)
app.put("/passwords/:id", auth, async (req, res) => {
  const { website, username, password } = req.body;

  try {
    let savedPassword = await Password.findById(req.params.id);
    if (!savedPassword)
      return res.status(404).json({ message: "Password entry not found" });

    if (savedPassword.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    savedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      { website, username, password },
      { new: true }
    );

    res.json(savedPassword);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all saved passwords for the logged-in user (protected route)
app.get("/passwords", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    res.json(
      passwords.map((password) => ({
        id: password._id,
        website: password.website,
        username: password.username,
        password: password.password,
      }))
    );
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add this to your backend
app.get("/db-status", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      status: "connected",
      state: mongoose.connection.readyState,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      state: mongoose.connection.readyState,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
