import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { exec } from 'child_process';
import { env } from 'process';
import { promisify } from 'util';

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
     * @param stdin 
     * @returns (map<string, string>) Stdout and Stderr from gla2h
     */
    async GLA2H_exec(stdin: string): Promise<Map<string, string>> {
        try{
            const {stdout, stderr} = await execAsync(
                `${env.GLA2H_PATH} '${stdin}' ${env.GLA2H_TIMED} ${env.GLA2H_BENCHMARK} ` +
                `${parseInt(env.GLA2H_MEMCOST)} ${parseInt(env.GLA2H_PASSES)} ${parseInt(env.GLA2H_THREADS)}`
            );

            return new Map([
                ['stdout', stdout],
                ['stderr', stderr],
            ]);
        } catch(err) { throw err }
    }
    
    /**
     * Helper function for GLA2H_exec, 
     * comes with default error handling and retry logic for failed attempts.
     * @param pw 
     * @returns output of GLA2H
     */
    async passwordHash(pw: string, attempts: number): Promise<string> { 
        let res: Map<string, string>
        let retries: number = 0;

        try {
            do {
                retries++;
                res = await this.GLA2H_exec(pw);
            } while(res['stdout'] === "" || retries < attempts + 1)

            // TODO: res['stderr'] might be null, implement proper guards
            if (retries === 4) {
                throw new Error(res['stderr'])
            }
            else return res['stdout']
        } catch(err) { console.error(err) }
    }

    /**
     * Uses `argon2.verify` for validation.
     * @param pw 
     * @param hash 
     * @returns (bool) pass or fail for password validation
     */
    async validateAgainstHash(norm: string, hash: string): Promise<boolean> { 
        return await argon2.verify(hash, `'${norm}'`); 
    }
}