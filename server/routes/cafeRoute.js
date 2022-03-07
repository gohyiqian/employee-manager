import express from "express";
const router = express.Router();
import { createCafe } from "../controllers/cafeController.js";

router.route("/").post(createCafe);

export default router;
