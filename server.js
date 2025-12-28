import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://pawslive.vercel.app", // production frontend
  "http://localhost:5173",       // local frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

// Body parser
app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});