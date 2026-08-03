import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import dotenv from "dotenv";
dotenv().config;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Personal Book Manager API",
  });
});

app.use(errorHandler);
export default app;