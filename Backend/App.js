import express from 'express'
import userRouter from './src/routes/userRouter.router.js';
import cors from 'cors'


const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//"use" is the middle ware stating that when this is writtent in the link section move to userRouter
app.use("/api/v1/user",userRouter);


export  default app