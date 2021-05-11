import { CacheModuleOptions } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-store"

export const redisOptions: CacheModuleOptions = {
    store: redisStore,
    host: 'localhost',
    port: 3020,
    ttl: 60,
}