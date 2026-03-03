import express from 'express'
import userRegisterRouter from './src/routes/userRouter.router.js';
import UpdateProfileRouter from './src/routes/ProfileUpadate.routes.js'
import jobRouter from "./src/routes/Job.router.js"
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app=express();

app.use(cors())
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(express.static("public"))
app.use(cookieParser())


//"use" is the middleware stating that when this is writtent in the link section move to userRouter
//for user registration
app.use("/api/v1/user",userRegisterRouter);

//for update  profile
app.use("/api/v1/user/profile/update",UpdateProfileRouter);

//for update job
app.use("/api/v1/job",jobRouter)


export  default app