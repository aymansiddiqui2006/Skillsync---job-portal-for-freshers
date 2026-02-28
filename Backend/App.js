import express from 'express'
import userRouter from './src/routes/userRouter.router.js';
const app=express();

app.use("/api/v1/user",userRouter)


export default app