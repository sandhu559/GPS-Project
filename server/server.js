const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const connectToDb = require("./config/ConnectDB");
const bodyParser = require("body-parser");
const GpsData = require("./models/gpsData");

dotenv.config();

// Create express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to the database


connectToDb();
// Webhook endpoint
app.post('/hook', async (req, res) => {
  console.log('Received POST request at /hook');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  const gpsReport = req.body.GPS_Report;

  if (!gpsReport) {
    console.error('GPS_Report not found in the request body');
    return res.status(400).send('GPS_Report not found');
  }

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
    hdop: gpsReport.HDOP,
    receivedTime: new Date(gpsReport.ReceivedTime),  // Adding receivedTime
    reportingFrequency: gpsReport.ReportingFrequency  // Adding reportingFrequency
  });

  try {
    await gpsData.save();
    console.log('Data saved to MongoDB:', JSON.stringify(gpsReport, null, 2));
    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});

// Fetch data route
app.get('/fetch-data', async (req, res) => {
  try {
    console.log('Fetching data from GpsData collection');
    const reports = await GpsData.find();
    console.log('Data fetched successfully:', reports);
    res.json(reports);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Catch-all route for undefined endpoints (to handle 404 errors)
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});