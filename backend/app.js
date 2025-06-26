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
  "http://localhost:5173",
  "http://localhost:5174/login",
  "https://abdul-qadeer-buriro.netlify.app",
  "https://aqkhan-dashboard-110.netlify.app",
  process.env.PORTFOLIO_URL,
  process.env.DASHBOARD_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or SSR)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
