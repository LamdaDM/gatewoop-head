import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { env } from 'node:process';

@Injectable()
export class pwSecrets {
    async hash(pw: string): Promise<string> {
        const salt = await bcrypt.genSalt(parseInt(env.ROUNDS), (err, salt) => {
            if(err != null) { console.error("salt failed to generate"); }
            else { return salt; }
        } );

        return await bcrypt.hash(pw, salt, (err, enc) => {
            if(err != null) { console.error("hash error!"); }
            else { return enc; } 
        });
    }

    async compare(input: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(input, hash, (err, same) => {
            if(err != null){ console.error("internal error with bcrypt.compare()"); }
            else { return same; }
        })
    }
}