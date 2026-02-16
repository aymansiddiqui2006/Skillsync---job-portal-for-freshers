import ConnectDB from "./src/DataBase/connectMongoDb.database.js"
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})

ConnectDB()