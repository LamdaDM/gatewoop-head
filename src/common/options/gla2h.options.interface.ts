export interface OptionsGLA2H {
    /**
     * Path to the gla2h script.
     */
    path: string;

    /**
     * Flag for timer to run or not. 
     * NOTE: NEEDS TO BE OFF FOR UNIT TEST.
     */
    timed: string;

    /**
     * Flag for benchmark (268 it)
     */
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
}