import express from "express";
import userRegisterRouter from "./src/router/userRouter.router.js";
import UpdateProfileRouter from "./src/router/ProfileUpdate.router.js";
import jobRouter from "./src/router/Job.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//"use" is the middleware stating that when this is writtent in the link section move to userRouter

//for update  profile
app.use("/api/v1/user/profile/update", UpdateProfileRouter);

//for user registration
app.use("/api/v1/user", userRegisterRouter);



//for update job
app.use("/api/v1/job", jobRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
