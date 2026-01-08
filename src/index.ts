import * as dotenv from "dotenv";
import express from "express";
import router from "./routes";
import { Socket } from "socket.io";
import {Server} from "socket.io";
import { createServer } from "http";
import setupSocketIO from "./socket.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app)
const io = new Server(server,{cors:{origin :"*"}})
dotenv.config();
setupSocketIO(io);
export {io}
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use("/api",router);
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}
);