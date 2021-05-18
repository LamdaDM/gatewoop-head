import { exec } from 'child_process';
import { promisify } from 'util';
import { OptionsGLA2H } from './gla2h.arguments.interface.deprecated';


const execAsync = promisify(exec)

/**
 * @deprecated
 */
export interface gla2h_Response {
    stdout?: string;
    stderr?: string;
}

/**
 * Provider for hashing and validating passwords using `argon2` and `gla2h`.
 * Intended for authentication services and persisting secrets. 
 * @deprecated
 */
export class gla2hProvider {
    /**
     * Uses `gla2h`, a go executable that hashes inputted strings and 
     * benchmarks the host's system for hashing by measuring execution time while 
     * increasing memory allocation and passes done using `argon2`.
     * @param stdin (string) input for hashing
     * @param gla2h_options (OptionsGLA2H) Arguments to pass to gla2h cli
     * @returns Map { 'stdout' => string, 'stderr' => string }
     * @deprecated
     */
    async GLA2H_exec(stdin: string, gla2h_options: OptionsGLA2H): Promise<gla2h_Response> {
        const {stdout, stderr} = await execAsync(
            `${gla2h_options.path} '${stdin}' ${gla2h_options.timed} ${gla2h_options.benchmark} ` +
            `${gla2h_options.memcost} ${gla2h_options.passes} ${gla2h_options.threads}`
        ).catch((err) => { throw err; })

        return {
            stdout: stdout,
            stderr: stderr
        };
    }

    /**
     * Helper function for GLA2H_exec, 
     * comes with default error handling for failed attempts.
     * @param pw (string) password to be hashed
     * @param gla2h_options (OptionsGLA2H) arguments to pass to gla2h cli
     * @returns (string) hash from GLA2H_exec().get('stdout')
     * @deprecated
     */
    async passwordHashExe(pw: string, gla2h_options: OptionsGLA2H): Promise<string> { 
        return await this.GLA2H_exec(pw, gla2h_options)
            .then((res) => {
                if(res.stderr !== ''){ throw new Error(res.stderr) }
                else { return res.stdout; }
            })
            .catch((err) => { throw err; })
    }
}