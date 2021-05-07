import { CacheModule as REDIS_PROVIDER, Global, Module } from "@nestjs/common";
import { ARGON2_GLA2H_PROVIDER } from "./hash.provider";
import { DB_MySQL } from "./mysql.conn.provider";
import { VALIDATOR_OPTIONS } from "./validator.options.provider";
import { redisStore } from "cache-manager-redis-store"

@Global()
@Module({
    imports:[
        REDIS_PROVIDER.register({
            store: redisStore,
            host: 'localhost',
            port: 3020,
            ttl: 60,
        }),
    ],
    providers: [ARGON2_GLA2H_PROVIDER, DB_MySQL, VALIDATOR_OPTIONS],
    exports: [ARGON2_GLA2H_PROVIDER, DB_MySQL, VALIDATOR_OPTIONS, REDIS_PROVIDER]
})
export class CommonProvidersModule{}