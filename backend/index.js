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

app.use(
  cors({
    origin: [
      "https://passprompt.vercel.app",
      "https://passprompt.line.pm",
      "https://passprompt-api.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.options("*", cors());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.set("debug", true);

const connectDB = async () => {
  try {
    // Remove deprecated options and add recommended ones
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("MongoDB connected successfully");

    // Handle connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log(
      "MongoDB URI (redacted):",
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(
            /mongodb\+srv:\/\/([^:]+):([^@]+)@/,
            "mongodb+srv://****:****@"
          )
        : "undefined"
    );

    // Exit process with failure if this is production
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;

connectDB();

// Middleware
const auth = (req, res, next) => {
  // Get the Authorization header directly from headers object
  const authHeader = req.headers["authorization"];

  // If there is no Authorization header, respond with 401
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Check if it follows Bearer scheme
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  // If there is no token after Bearer, respond with 401
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key_not_for_production"
    );

    // Set the user in the request object
    req.user = decoded.user;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;

app.get("/", (req, res) => {
  res.send("Welcome to the Passgen API!");
});

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

    // Create a new user instance without the password initially
    user = new User({ fullName, email, password: "", phone });

    // Hash the password and assign it to user.password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Log the hashed password to verify
    console.log("Hashed password:", user.password);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "fallback_secret_key_not_for_production",
      { expiresIn: "1h" }
    );

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
// app.get("/db-status", async (req, res) => {
//   try {
//     await mongoose.connection.db.admin().ping();
//     res.json({
//       status: "connected",
//       state: mongoose.connection.readyState,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       error: error.message,
//       state: mongoose.connection.readyState,
//     });
//   }
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
