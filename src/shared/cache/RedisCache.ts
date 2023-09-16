import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../config/cache';

export default class RedisCache{
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void>{
    console.log(key, value);
  }

  public async recover<Type>(key: string): Promise<Type | null> {
    return "teste" as Type;
  }

  public async invalidate(key: string): Promise<void>{
    
  }
}