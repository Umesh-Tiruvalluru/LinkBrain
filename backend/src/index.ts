import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import contentRouter from "./routes/contentRoutes";
import shareRouter from "./routes/shareRouter";
import cors from "cors";
import * as dotenv from "dotenv";
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const port = process.env.PORT || 4000;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

app.use("/api/v1/", userRouter);

app.use("/api/v1/", contentRouter);

app.use("/api/v1/brain", shareRouter);

mongoose.connect(process.env.MONGO_URL || "");

app.listen(port, () => console.log(`Listening at port ${port}`));
