const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
