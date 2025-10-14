require("dotenv").config();
const mongoose = require("mongoose");

/**
 * connectToMongo(): Tries to connect to a real MongoDB using MONGODB_URI.
 * If that is not provided or connection fails, starts an in-memory MongoDB
 * (mongodb-memory-server) and connects to it. This makes the app runnable
 * without installing MongoDB locally (good for quick dev/testing).
 */
let mongoURI = process.env.MONGODB_URI;
let _memoryServer = null;

const connectToMongo = async () => {
  // Try real MongoDB if URI provided
  if (mongoURI) {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB Successfully");
      return;
    } catch (error) {
      console.error("Error connecting to MongoDB at", mongoURI, error);
      console.warn("Falling back to in-memory MongoDB...");
    }
  } else {
    console.warn("MONGODB_URI not set — starting in-memory MongoDB...");
  }

  // Fallback: start mongodb-memory-server
  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    _memoryServer = await MongoMemoryServer.create();
    const uri = _memoryServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to in-memory MongoDB");
  } catch (err) {
    console.error("Failed to start in-memory MongoDB:", err);
    throw err; // let callers know
  }
};

// Helper to stop in-memory server (if started)
connectToMongo.stopMemoryServer = async () => {
  try {
    if (mongoose.connection.readyState) await mongoose.disconnect();
    if (_memoryServer) await _memoryServer.stop();
    console.log('Memory MongoDB stopped');
  } catch (err) {
    console.warn('Error stopping memory MongoDB', err);
  }
};

module.exports = connectToMongo;
