const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const userRoutes = require("./routes/userRoutes"); // Ensure this path is correct
const menuRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationsRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes"); // Ensure this file exists

// Define API Routes
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

// Test Email Endpoint
app.get("/api/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test-recipient@example.com", // Replace with a valid recipient email
      subject: "Test Email",
      text: "This is a test email from the Greek Taverna API!",
    });

    console.log("Email sent:", info.response);
    res.status(200).send("Test email sent successfully.");
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).send("Error sending test email.");
  }
});

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Greek Taverna API!");
});

// 404 Error Handling for Missing Routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
