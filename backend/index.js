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
  "https://passprompt.vercel.app",
  "https://passgen-api.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Using cached database connection");
    return cachedConnection;
  }

  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, opts);

    cachedConnection = conn;
    console.log("MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;

// Middleware for protecting routes

const auth = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If there is no token, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET if you're using environment variables
    req.user = decoded.user; // Ensure that your token contains the user information in the expected structure
    next(); // Move to the next middleware/route handler
  } catch (err) {
    console.error("Token verification failed:", err.message); // Log the specific error message for easier debugging
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth; // Don't forget to export the middleware

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
  console.log("Login request received");

  try {
    // Ensure DB connection
    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET || "fallback_secret_key_not_for_production",
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something broke!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
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
