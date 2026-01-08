import {Server} from "socket.io";

export default function setupSocketIO(io:Server){
    io.on("connection",(socket)=>{
        console.log("User connected");
        socket.on("disconnect",()=>{
            console.log("User disconnected");
        })
    })
}
