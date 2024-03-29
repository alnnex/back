const mongoose = require("mongoose").set("strictQuery", true);
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB : ${conn.connection.host}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
