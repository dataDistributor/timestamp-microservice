const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Root route to serve the landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API route for the timestamp microservice
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // If no date is provided, use the current date
  if (!dateParam) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Check if the input is a valid UNIX timestamp
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  // Create a date object
  const date = new Date(dateParam);

  // Validate the date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
