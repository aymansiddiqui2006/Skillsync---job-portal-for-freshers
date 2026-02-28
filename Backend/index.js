import ConnectDB from "./src/DataBase/connectMongoDb.database.js";
import dotenv from "dotenv";
import app from './App.js'

dotenv.config({
  path: "./env",
});

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is runner in port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed", err);
  });
