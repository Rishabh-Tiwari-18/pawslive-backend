import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://pawslive.vercel.app",
  "http://localhost:5173"
];

// Manual Middleware for absolute control
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle Preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Standard CORS as a backup
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

// Basic Health Check
app.get("/", (req, res) => res.send("API is active"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});