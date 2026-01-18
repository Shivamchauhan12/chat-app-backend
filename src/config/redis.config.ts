import Redis from "ioredis";

const redisClient = new Redis(
  "ediss://default:AZY7AAIncDE4ZjgwYjI3MWVjM2Q0YWM1OTA2YTkwN2ViM2E2MWZmY3AxMzg0NTk@pumped-mantis-38459.upstash.io:6379",
  {
    tls: {},
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  }
);

redisClient.on("connect", () => {
  console.log("✅ Connected to Upstash Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redisClient;
