import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import initDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

// routers
import cafeRouter from "./routes/cafeRoute.js";
import employeeRouter from "./routes/employeeRoute.js";
import drinkRouter from "./routes/drinkRoute.js";

// middlewares
app.use(express.json());

// use routers
app.use("/drinks", drinkRouter);
app.use("/api", cafeRouter);
app.use("/api", employeeRouter);

app.get("/", (req, res) => {
  // throw new Error("error");
  res.send("Welcome!");
});

initDB(); // initialise mongoDB

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
