import {producer} from "./config/kafka.config.js";
import {consumer} from "./config/kafka.config.js";
import {prisma} from "./config/db.config.js";

export const produceMessage = async (topic: string, message: string) => {
    try {
        await producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
    } catch (error) {
        console.error("Error producing message:", error);
    }}

export const consumeMessage = async (topic: string) => {
  await consumer.connect();

  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();
      if (!value) return;
      const data = JSON.parse(value);
      await prisma.chats.create({ data });
    },
  });
};
