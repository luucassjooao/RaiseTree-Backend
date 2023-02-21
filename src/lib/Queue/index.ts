import QueueBull, {
  Queue, Job, JobOptions, RateLimiter,
} from 'bull';

export interface QueueData<T> {
  data: T;
  options?: JobOptions;
  limiter?: RateLimiter;
}

export abstract class BullQueue<T> {
  public queue: Queue<T>;

  protected constructor(queueName: string) {
    this.queue = new QueueBull(queueName, {
      redis: {
        host: process.env.REDISHOST,
        port: Number(process.env.REDISPORT),
        password: process.env.REDISPASSWORD,
      },
    });
    this.process();
  }

  public async add(queueData: QueueData<T>): Promise<Job<T>> {
    return this.queue.add(queueData.data, queueData.options);
  }

  protected abstract process(): Promise<void>;
}
