import express from "express";
const router = express.Router();
import { getDrinksByType } from "../controllers/drinkController.js";

router.route("").get(getDrinksByType);

export default router;
