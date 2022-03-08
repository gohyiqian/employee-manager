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
app.use("/", cafeRouter);
app.use("/", employeeRouter);

app.get("/", (req, res) => {
  // throw new Error("error");
  res.json({
    "Hi! I am Kenji": "Click line below to direct to GET routes",
    Frontend: "http://localhost:3000/employee/list",
    Coffee: "http://localhost:5000/drinks?type=coffee",
    Beer: "http://localhost:5000/drinks?type=beer",
    "Cafe by Location": "http://localhost:5000/cafes?location=bedok",
    "All Employees": "http://localhost:5000/cafes/employees",
    Sample: "Mongoose Schema",
    newCafe: {
      _id: "6226cb4f3223db5c10e34c4b",
      name: "FunkyCafe",
      description: "Come join the party",
      employees: 21,
      logo: "image.png",
      location: "bedok",
      id: "89e7b00f-059a-46f2-8ab0-0e3385148a14",
      createdAt: "2022-03-08T03:19:43.027Z",
      updatedAt: "2022-03-08T03:19:43.027Z",
      __v: 0,
    },
    newEmployee: {
      _id: "6226cd0faf20ab4c96fef9da",
      name: "Daryl",
      days_worked: 8,
      cafe: "6226cb4f3223db5c10e34c4b",
      id: "UI9d5zt1U",
      createdAt: "2022-03-08T03:27:11.981Z",
      updatedAt: "2022-03-08T03:27:11.981Z",
      __v: 0,
    },
  });
});

initDB(); // initialise mongoDB

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
