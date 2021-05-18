import fastifySession from "fastify-session";
import { Redis } from "ioredis";

export class RedisSessionStore implements fastifySession.SessionStore {
    private readonly redis: Redis;
    private readonly keyPrefix: string;

    constructor(redisService: Redis, keyPrefix: string){
        this.redis = redisService;
        this.keyPrefix = keyPrefix;
    }

    private completeKey(sessionId: string) { return `${this.keyPrefix}${sessionId}`; }

    set(sessionId: string, session: any, callback: (err?: Error) => void): void {
        this.redis.set(this.completeKey(sessionId), JSON.stringify(session))
            .then(() => callback())
            .catch((err) => callback(err))
    }

    get(sessionId: string, callback: (err?: Error, session?: any) => void): void {
        this.redis.get(this.completeKey(sessionId))
            .then((val) => {
                callback(
                    undefined, 
                    val ? JSON.parse(val) 
                        : JSON.parse("{}")
                )
            })
            .catch((err) => callback(err))
    }

    destroy(sessionId: string, callback: (err?: Error) => void): void {
        this.redis.del(this.completeKey(sessionId))
            .then(() => callback())
            .catch((err) => callback(err))
    }
}