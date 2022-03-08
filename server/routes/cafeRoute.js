import express from "express";
const router = express.Router();
import {
  createCafe,
  createCafeEmployee,
  getAllEmployees,
  getCafeLocation,
} from "../controllers/cafeController.js";

router.route("/cafe").post(createCafe);
router.route("/cafe/employee").post(createCafeEmployee);
router.route("/cafes/employees").get(getAllEmployees);
router.route(`/cafes`).get(getCafeLocation);

export default router;
