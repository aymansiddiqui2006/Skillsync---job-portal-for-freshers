import express from "express"
import asyncHandler from "express-async-handler"

const AsyncHadler=(req,res,next)=>{
    Promise.resolve((req,res,next)).catch(next());
}

export default AsyncHadler;