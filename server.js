import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://pawslive.vercel.app",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/book-appointment", bookingRoute);

app.get("/", (req, res) => res.send("API is Live"));

// This is still needed for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server on ${PORT}`));
}

// CRITICAL FOR VERCEL:
export default app;