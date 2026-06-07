import Redis from "ioredis";

const redisClient = new Redis(
  "rediss://default:gQAAAAAAAjPFAAIgcDFjYmVhNDBjMzBmZDM0YTk5OTUwY2RjMmQzOGNjM2NkNw@giving-krill-144325.upstash.io:6379",
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
