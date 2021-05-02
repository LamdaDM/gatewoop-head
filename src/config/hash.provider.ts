import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2'
import { exec } from 'node:child_process';
import { env } from 'node:process';
import { promisify } from 'node:util';

const execAsync = promisify(exec)

/**
 * Provider for hashing and validating passwords using `argon2` and `gla2h`.
 * Intended for authentication services and persistence. 
 * @method GLA2H_exec
 * @method validate
 */
@Injectable()
export class ARGON2_GLA2H_PROVIDER {
    /**
     * Uses `gla2h`, a go executable that hashes inputted strings and 
     * benchmarks the host's system for hashing by measuring execution time while 
     * increasing memory allocation and passes done using `argon2`.
     * Arguments passed to `gla2h` should come from environment variables `(env.gla2h.params)`.
     * @param pw 
     * @returns (map<string, string>) Stdout and Stderr from gla2h
     */
    async GLA2H_exec(pw: string): Promise<Map<string, string>> {
        try{
            const {stdout, stderr} = await execAsync(
                `$SCRIPT/gla2h '${pw}' ${env.GLA2H_TIMED} ${env.GLA2H_BENCHMARK} ` +
                `${parseInt(env.GLA2H_MEMCOST)} ${parseInt(env.GLA2H_PASSES)} ${parseInt(env.GLA2H_THREADS)}`
            );

            return new Map([
                ['stdout', stdout],
                ['stderr', stderr],
            ]);
        } catch(err) { throw err }
    }
    
    /**
     * Uses `argon2.verify` for validation
     * @param pw 
     * @param hash 
     * @returns (bool) pass or fail for password validation
     */
    async validate(pw: string, hash: string): Promise<boolean> { return await argon2.verify(hash, pw); }
}