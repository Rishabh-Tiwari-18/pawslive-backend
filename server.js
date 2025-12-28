import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

// Proper CORS setup
app.use(
  cors({
    origin: ["https://pawslive.vercel.app", "http://localhost:5173"], // frontend URLs
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});