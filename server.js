import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

// 1. Define allowed origins
const allowedOrigins = [
  "https://pawslive.vercel.app",
  "http://localhost:5173"
];

// 2. Robust CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required if you use cookies or Authorization headers
  })
);

// 3. Explicitly handle Pre-flight requests for all routes
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

// Basic health check
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});