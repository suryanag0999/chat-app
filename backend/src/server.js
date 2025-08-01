import dotenv from "dotenv";
import connectDB from "./db/index.js";
// import {app} from "../app.js";
import { server } from "./libs/socket.js";

dotenv.config({
    path:".env",
});

const PORT = process.env.PORT ||7001;
connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((err)=>{
    console.log("mongodb connection error", err);
});