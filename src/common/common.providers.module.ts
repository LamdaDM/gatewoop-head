import { CacheModule, Global, Module } from "@nestjs/common";
import { MySQLConnProvider } from "./providers/mysql/mysql.provider";
import { HashService } from "./providers/hash/hash.provider";
import { caching_Args } from "./secret-args/arguments.priv";

@Global()
@Module({
    imports:[CacheModule.register({ redisOptions: caching_Args})],
    providers: [HashService, MySQLConnProvider],
    exports: [HashService, MySQLConnProvider, CacheModule]
})
export class CommonProvidersModule{}