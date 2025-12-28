import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./db.js";  // No need to connect DB if not using MongoDB anymore
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";  // Should import routes, not controller directly

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://pawslive.vercel.app" || "https://localhost:8080"], // your frontend URL
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

// No DB connection now
// connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
