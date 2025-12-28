import express from "express";
import { sendBookingEmail } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", sendBookingEmail);

export default router;
