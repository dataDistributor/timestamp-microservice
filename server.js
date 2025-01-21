const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files (index.html)
app.use(express.static("public"));

// Root route to serve the main page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API route for the timestamp microservice
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  // If no date is provided, use the current date
  if (!dateParam) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Check if the dateParam is a valid timestamp or date string
  const date = isNaN(dateParam) ? new Date(dateParam) : new Date(parseInt(dateParam));

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
