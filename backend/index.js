const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const User = require("./models/userModel");
const Password = require("./models/passwordModel");

const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envPath) });

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://passgenio.vercel.app/"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // access-control-allow-credentials:true
    methods: "GET,PUT,POST,DELETE",
    optionSuccessStatus: 200,
  })
);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware for protecting routes
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace('Bearer ', '');
  console.log('Received token:', token); // Debug log

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "S3CR3T"); // Make sure this matches the secret used in login
    console.log('Decoded token:', decoded); // Debug log
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

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
    const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    console.error("Error during registration:", err); // Improved error logging
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login an existing user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "S3CR3T", { expiresIn: "1h" });

    res.json({
      token,
      user: {
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
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
      user: req.user.id, // Associate the password with the logged-in user
    });

    const savedPassword = await newPassword.save();

    res.status(201).json({
      id: savedPassword._id,
      website: savedPassword.website,
      username: savedPassword.username,
      password: savedPassword.password,
    });
  } catch (err) {
    console.error('Error saving password:', err);
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
    res.json(passwords.map(password => ({
      id: password._id,
      website: password.website,
      username: password.username,
      password: password.password,
    })));
  } catch (err) {
    console.error('Error fetching passwords:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
