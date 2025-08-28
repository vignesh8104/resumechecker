import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import candidatesRouter from "./routes/candidates.js";
import statsRouter from "./routes/stats.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Make io available in routes
app.use((req, _res, next) => { req.io = io; next(); });

app.get("/", (_req, res) => res.send("Mini ATS API running"));
app.use("/api/candidates", candidatesRouter);
app.use("/api/stats", statsRouter);

const PORT = process.env.PORT || 5000;
const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};
start().catch(err => {
  console.error("Failed to start:", err);
  process.exit(1);
});
