import { Global, Module } from "@nestjs/common";
import { ARGON2_GLA2H_PROVIDER } from "./hash.provider";
import { DB_MySQL } from "./mysql.conn.provider";
import { VALIDATOR_OPTIONS } from "./validator.options.provider";

@Global()
@Module({
    providers: [ARGON2_GLA2H_PROVIDER, DB_MySQL, VALIDATOR_OPTIONS],
    exports: [ARGON2_GLA2H_PROVIDER, DB_MySQL, VALIDATOR_OPTIONS]
})
export class CommonProvidersModule{}