import { CacheModule as REDIS_PROVIDER, Global, Module } from "@nestjs/common";
import { ARGON2_GLA2H_PROVIDER } from "./hash.provider";
import { DB_MySQL } from "./mysql.conn.provider";
import { redisOptions } from "./options/redis.options"

@Global()
@Module({
    imports:[REDIS_PROVIDER.register({ redisOptions})],
    providers: [ARGON2_GLA2H_PROVIDER, DB_MySQL],
    exports: [ARGON2_GLA2H_PROVIDER, DB_MySQL, REDIS_PROVIDER]
})
export class CommonProvidersModule{}