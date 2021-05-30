import { CacheModule, Global, Module } from "@nestjs/common";
import { MySQLConnectionService } from "./providers/mysql/mysql.service";
import { HashService } from "./providers/hash/hash.service";
import { caching_Args } from "./secret-args/arguments.priv";
import { HashTrunkerCommunicator } from "./providers/hash/trunker/hash.communicator.trunker";
import { TrunkerLogger } from "./lib/logger/trunker/trunker.logger";

const hashServiceFactory = {
    provide: HashService, 
    useFactory: (communicator: HashTrunkerCommunicator,
        logger: TrunkerLogger) => {
        return new HashService(communicator, logger);
    },
    inject: [HashTrunkerCommunicator, TrunkerLogger]
}

@Global()
@Module({
    imports:[CacheModule.register({ redisOptions: caching_Args})],
    providers: [MySQLConnectionService],
    exports: [hashServiceFactory, MySQLConnectionService, CacheModule]
})
export class CommonProvidersModule{}