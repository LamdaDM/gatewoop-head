import { CacheModule as REDIS_PROVIDER, Global, Module } from "@nestjs/common";
import { MySQLConnProvider } from "./mysql/mysql.provider";
import { redis_Args } from "./cache/redis-cache.arguments"
import { HashProvider } from "./hash/hash.provider";

@Global()
@Module({
    imports:[REDIS_PROVIDER.register({ redisOptions: redis_Args})],
    providers: [HashProvider, MySQLConnProvider],
    exports: [HashProvider, MySQLConnProvider, REDIS_PROVIDER]
})
export class CommonProvidersModule{}