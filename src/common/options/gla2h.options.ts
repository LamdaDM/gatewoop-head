import { env } from "process";
import { OptionsGLA2H } from "./gla2h.options.interface";

export const gla2hArgs: OptionsGLA2H = {
    path: env.GLA2H_PATH,
    timed: env.GLA2H_TIMED,
    benchmark: env.GLA2H_BENCHMARK,
    memcost: parseInt(env.GLA2H_MEMCOST),
    passes: parseInt(env.GLA2H_PASSES),
    threads: parseInt(env.GLA2H_THREADS)
}