import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = true;
    this.client.on('error', (err) => {
      console.log(err);
      this.isConnected = false;
    });
    this.client.on('connect', () => {
        this.isConnected = true; });
    (async () => {
      try {
        await this.client.connect();
      } catch (err) {
        console.error('Failed to connect to Redis:', err);
      }
    })();
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    try {
      return await this.client.get(key);}
    catch (error) {
      console.error(`Error setting value for key "${key}":`, error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });}
    catch (error) {
      console.error(`Error setting value for key "${key}":`, error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);}
    catch (err) {
      console.error(`Error deleting key "${key}":`, err);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
