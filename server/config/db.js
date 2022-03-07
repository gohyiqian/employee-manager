import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

const initDB = () => {
  mongoose.connect(
    mongoURI,
    {
      useUnifiedTopology: true,
    },
    () => {
      console.log("The connection with mongoDB is established");
    }
  );

  // db check error
  db.on("connected", () => console.log("My database is connected"))
    .on("error", (err) => console.log(`Got error! ${err.message}`))
    .on("disconnected", () => console.log("My database is disconnected"));
};

export default initDB;
