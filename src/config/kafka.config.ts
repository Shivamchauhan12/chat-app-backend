import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";

export const kafka = new Kafka({
  clientId: "chat-backend",
  brokers: [
    "chats-shivamchauhan5733-92b6.i.aivencloud.com:20052"
  ],
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.resolve("certs/ca.pem"), "utf-8")],
    key: fs.readFileSync(path.resolve("certs/service.key"), "utf-8"),
    cert: fs.readFileSync(path.resolve("certs/service.cert"), "utf-8"),
  },
});

export const producer =  kafka.producer()
export const consumer = kafka.consumer({ groupId: "chat-messages"});

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
}