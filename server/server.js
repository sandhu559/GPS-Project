//import dependencies
const express = require("express")
const dotenv = require("dotenv");
const connectToDb = require("./config/ConnectDB");
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const bodyParser = require("body-parser")
const GpsData = require("./models/gpsData")

//create express app
const app = express()

//middleware to parse JSON
app.use(bodyParser.json());


connectToDb;

//Routing
app.get('/', (req, res) => {
    res.json({hello: "waheguru"})
    });
    
//Webhook endpoint
app.post('/webhook', (req,res) => {
    const gpsData =req.body;
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
})


//function to save gps data
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
  
    await gpsData.save();
  };
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});