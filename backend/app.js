import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";

// Routers
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

const allowedOrigins = [
  "http://localhost:5173",               // for local dev
  "http://localhost:5174",               // optional
  process.env.PORTFOLIO_URL,             // frontend prod URL
  process.env.DASHBOARD_URL              // admin dashboard prod URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow undefined origin for non-browser tools like Postman
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/message", messageRouter);

// ✅ Connect to MongoDB
dbConnection();

// ✅ Error handling middleware
app.use(errorMiddleware);

export default app;
