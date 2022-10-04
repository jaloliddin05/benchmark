import {Result} from '../argument/interface'
export interface IBenchmark{
    run: ()=>Promise<{ results: Result[], resultsAVG: Result, resultsSTDs: Result[] }>
}