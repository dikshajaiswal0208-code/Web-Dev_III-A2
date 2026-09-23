const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const PORT = process.env.PORT || 3000;

// ------------------- Middleware -------------------
app.use(express.json());     // parse JSON request bodies
app.use(logger);             // custom logger middleware (logs every request)

// ------------------- Routes -------------------
app.use("/students", studentRoutes);

// Root route (just to check server is alive)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Management REST API is running" });
});

// ------------------- 404 Handler -------------------
// Runs when no route above matched
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ------------------- Global Error Handler -------------------
// Catches any errors thrown/passed via next(err)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
