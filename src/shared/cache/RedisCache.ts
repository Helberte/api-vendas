import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../config/cache';

export default class RedisCache{
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void>{
    await this.client.set(key, JSON.stringify(value));
    //                            converte para string json qualuqer valor passado

  }

  public async recover<Type>(key: string): Promise<Type | null> {
    const data = await this.client.get(key);

    if (!data)
      return null;

    // como a informação foi transformada em JSON string, ela precisa voltar pro que era antes
    const parsedData = JSON.parse(data) as Type;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void>{
    await this.client.del(key);
  }
}