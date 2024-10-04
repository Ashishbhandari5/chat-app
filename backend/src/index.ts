// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

// import dotenv from "dotenv";
// import { app, server } from "./socket/socket.js";
// dotenv.config();
// const PORT = 5001;
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5001", // Change this to your frontend port
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   })
// );
// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

// server.listen(PORT, () => {
//   console.log("Server running at " + PORT);
// });
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json

cors({
  origin: "http://localhost:5002", // Change this to your frontend port
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
