// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const GpsData = require("./models/gpsData");

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

// Call the function to connect to the database
connectToDb();

// Routing
app.get('/', (req, res) => {
  res.json({ hello: "waheguru" });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const gpsData = req.body;
  // Process and save the data
  saveGpsDataToDatabase(gpsData)
    .then(() => {
      console.log(req.body);
      res.status(200).send('Webhook received');
    })
    .catch(err => {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    });
});

// Function to save GPS data
const saveGpsDataToDatabase = async (data) => {
  const gpsReport = data.GPS_Report;

  const gpsData = new GpsData({
    deviceId: gpsReport.DeviceID,
    latitude: gpsReport.Latitude,
    longitude: gpsReport.Longitude,
    timestamp: new Date(gpsReport.CreateTime),
    accuracy: gpsReport.Accuracy,
    deviceState: gpsReport.DeviceState,
    heading: gpsReport.Heading,
    speed: gpsReport.Speed,
    temperature: gpsReport.Temperature,
    voltage: gpsReport.Voltage,
    voltagePercent: gpsReport.VoltagePercent,
    positionSource: gpsReport.PositionSource,
    reportReason: gpsReport.ReportReason,
    rssi: gpsReport.RSSI,
    hdop: gpsReport.HDOP
  });

  try {
    // Save the new gpsData instance to the MongoDB collection
    await gpsData.save();
    console.log('Data saved to MongoDB:', JSON.stringify(gpsReport, null, 2)); // Log the saved data for confirmation
  } catch (err) {
    console.error('Error saving data:', err); // Log any errors that occur during saving
    throw err; // Re-throw the error to handle it in the route
  }
};

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
