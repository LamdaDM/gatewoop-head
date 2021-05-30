export interface HashCommunicatorService {
    callHash(norm: string): Promise<string>;
}