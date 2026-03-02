import express from 'express'
import userRegisterRouter from './src/routes/userRouter.router.js';
import UpdateProfileRouter from './src/routes/ProfileUpadate.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app=express();

app.use(cors())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//"use" is the middleware stating that when this is writtent in the link section move to userRouter
app.use("/api/v1/user",userRegisterRouter);

app.use("/api/v1/user/profile/update",UpdateProfileRouter);


export  default app