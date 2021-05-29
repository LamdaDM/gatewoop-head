import * as argon2 from 'argon2';

export class HashService {
    async validateAgainstHash(hash: string, norm: string): Promise<boolean> {
        return await argon2.verify(hash, norm);
    }
}