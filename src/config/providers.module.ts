import { Global, Module } from "@nestjs/common";
import { PASSWORD_HASHER } from "./hash.provider";
import { DB_MySQL } from "./mysql.conn.provider";
import { VALIDATOR_OPTIONS } from "./validator.options.provider";

@Global()
@Module({
    providers: [PASSWORD_HASHER, DB_MySQL, VALIDATOR_OPTIONS],
    exports: [PASSWORD_HASHER, DB_MySQL, VALIDATOR_OPTIONS]
})
export class CommonProvidersModule{}