
export interface Arguments {
    path: string;
    runsCount: number;
    iterationsCount: number;
}

export interface Result {
    processPID: number;
    name: string;
    cpu: number;
    ram: number;
    time: number;
    run:number
}

export interface Message {
    func: string;
    iterations: number;
    funcName:string,
    runsCount:number
}


export interface CollectResults {
    processPID: number;
    name: string;
    run:number,

    cpuUsage: string;
    cpuAvgUsage: string;
    cpuSTDUsage: string;

    memoryUsage: string;
    memoryAvgUsage: string;
    memorySTDUsage: string;

    time: string;
    timeAVG: string;
    timeSTD: string;
}