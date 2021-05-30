import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { TrunkerLogger } from 'src/common/lib/logger/trunker/trunker.logger';
import { HashCommunicatorService } from './hash.communicator.interface';

@Injectable()
export class HashService {
    constructor(
        private hashComm: HashCommunicatorService,
        private logger: TrunkerLogger
    ){}

    async hash(norm: string): Promise<string> {
        return await this
            .hashComm
            .callHash(norm)
                .then((hash) => { return hash; })
                .catch((err) => { 
                    this.logger.error(err);
                    return null; 
                })
    }

    async validateAgainstHash(hash: string, norm: string): Promise<boolean> {
        return await argon2.verify(hash, norm);
    }
}