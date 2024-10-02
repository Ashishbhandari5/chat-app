import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000", // Change this to your frontend port
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
