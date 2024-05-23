const mongoose = require('mongoose');

const gpsDataSchema = new mongoose.Schema({
    deviceId: Number,
    latitude: Number,
    longitude: Number,
    timestamp: Date,
    accuracy: Number,
    deviceState: String,
    heading: Number,
    speed: Number,
    temperature: Number,
    voltage: Number,
    voltagePercent: Number,
    positionSource: String,
    reportReason: String,
    rssi: Number,
    hdop: Number
  });
  
  module.exports = mongoose.model('GpsData', gpsDataSchema);
  