import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import initDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

//models
import Cafe from "./models/Cafe.js";
import Employee from "./models/Employee.js";

// routers
import cafeRouter from "./routes/cafeRoute.js";

// middlewares
app.use(express.json());

// use routers
app.use("/api/cafe", cafeRouter);

app.get("/", (req, res) => {
  // throw new Error("error");
  res.send("Welcome!");
});

initDB(); // initialise mongoDB

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
