/**
 * @deprecated
 */
export interface OptionsGLA2H {
    
    path: string;

    timed: string;

    benchmark: string;

    /**
     * Memory (megabytes) to give to the thread pool.
     */
    memcost: number;

    /**
     * How many passes argon2 will complete.
     */
    passes: number;

    /**
     * Amount of threads given to thread pool.
     */
    threads: number;

    /**
     * Host address for servegla2h tcp server.
     */
    host: string;

    /**
     * Target port for servegla2h tcp server.
     */
    port: number;
}