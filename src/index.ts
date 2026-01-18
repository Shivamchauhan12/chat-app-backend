import "dotenv/config";
import express from "express";
import Routes from "./routes/index.js";
import { Socket } from "socket.io";
import {Server} from "socket.io";
import { createServer } from "http";
import {setupSocket} from "./socket.js";
import cors from "cors";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redisClient from "./config/redis.config.js";
import {connectKafkaProducer} from "./config/kafka.config.js";
import {consumeMessage} from "./helper.js";

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app)
const io = new Server(server,{cors:{origin :"*"},adapter:createAdapter(redisClient)});
// dotenv.config();
setupSocket(io);
export {io}
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

connectKafkaProducer().catch((err)=>{
    console.error("Error connecting Kafka Producer",err);
});
consumeMessage("chat-messages").catch((err)=>{
    console.error("Error consuming messages",err);
});
app.use("/api",Routes);
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}
);