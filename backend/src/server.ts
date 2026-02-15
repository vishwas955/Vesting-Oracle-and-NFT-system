import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import express from "express";

import { ensureApproval } from "./services/approval.service";
import startIndexer from "./services/indexer.service";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async() => {
  try{
    await connectDB();
    await ensureApproval();
    startIndexer();

    app.listen(PORT, () => {
      console.log("Server running on port 5000");
    });

  }catch(error){
    console.error("Server failed:", error);
  }
};

startServer();
import authRoutes from "./routes/auth.routes";
app.use("/api", authRoutes);

import vestingRoutes from "./routes/vesting.routes";
app.use("/api/vesting",vestingRoutes);

import analyticsRoutes from "./routes/analytics.routes";
app.use("/api/analytics", analyticsRoutes);

app.get("/health", (req, res) => {
  res.json({status: "ok"});
});

