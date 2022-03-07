import express from "express";
const router = express.Router();

import { createEmployee } from "../controllers/employeeController.js";

router.route("/employee").post(createEmployee);

export default router;
