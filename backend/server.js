import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import geminiRouter from "./routes/geminiRoute.js"
import supportRouter from "./routes/supportRoute.js";
import dotenv from "dotenv";

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://hungry-hub-client.onrender.com",
  "https://hungry-hub-admin-5v2a.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Database Connection
connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api/support", supportRouter);
// Static folder for images
app.use("/images", express.static("uploads"));

// Health check route
app.get("/", (req, res) => {
  res.send("API Working Successfully!");
});

// Server start
app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
