import asyncRedis from "async-redis";
const client = asyncRedis.createClient();

// Define an array of keys and values
const keyValues = [
  { key: "cooldown", value: "{}" },
  { key: "activeReminder", value: [] },
  { key: "afk", value: {"activeAfk": ["testing"]} },
  { key: "AnimeCount", value: "{}" },
  { key: "holquestions", value: "{}" },
  // Add more key-value pairs as needed
];

// Async function to check and create keys
async function checkAndCreateKeys() {
  for (const { key, value } of keyValues) {
    // Check if the key exists
    const keyExists = await client.exists(key);

    if (keyExists) {
      console.log(`Key "${key}" already exists in Redis.`);
    } else {
      // Key doesn't exist, create it
      await client.set(key, JSON.stringify(value));
      console.log(`Key "${key}" created with value "${value}" in Redis.`);
    }
  }

  // Close the Redis connection
  await client.quit();
}

export async function redisinit() {
  // Call the async function
  return checkAndCreateKeys()
    .catch((err) => console.error(err))
}
