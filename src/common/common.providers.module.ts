import { CacheModule as REDIS_PROVIDER, Global, Module } from "@nestjs/common";
import { MySQLConnProvider } from "./providers/mysql/mysql.provider";
import { redis_Args } from "./lib/cache/redis-cache.arguments"
import { HashProvider } from "./providers/hash/hash.provider";

@Global()
@Module({
    imports:[REDIS_PROVIDER.register({ redisOptions: redis_Args})],
    providers: [HashProvider, MySQLConnProvider],
    exports: [HashProvider, MySQLConnProvider, REDIS_PROVIDER]
})
export class CommonProvidersModule{}