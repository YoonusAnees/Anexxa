const mongoose = require("mongoose");

const connectDB = async () => { // ✅ Remove parameter
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ Use process.env directly
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;