import express from 'express'
import userRouter from './src/routes/userRouter.router.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app=express();

app.use(cors())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//"use" is the middleware stating that when this is writtent in the link section move to userRouter
app.use("/api/v1/user",userRouter);


export  default app