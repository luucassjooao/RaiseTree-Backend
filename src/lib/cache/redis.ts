import IORedis from 'ioredis';

const redis = new IORedis({
  host: process.env.REDISHOST,
  port: Number(process.env.REDISPORT),
  password: process.env.REDISPASSWORD,
});

export default redis;
