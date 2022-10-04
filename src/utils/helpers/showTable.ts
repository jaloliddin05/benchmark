const Table = require("cli-table")

import {CollectResults, Result} from "../../types/argument/interface";

export class ShowTable {
    private table
    constructor(
        private results: Result[],
        private resultsAVG: Result,
        private resultsSTDs: Result[]
    ) {
  this.table = new Table({ head: ["","name", "run", "time","avgTime","timeDevition","ram","avgRam","ramDevition","cpu","avgCpu","cpuDevition","pID"] })
    }

    public show(): void {
        for (let resultIndex = 0; resultIndex < this.results.length; resultIndex++) {
            const result = this.results[resultIndex];
            const resultsAVG = this.resultsAVG;
            const resultsSTD = this.resultsSTDs[resultIndex];

            const systemInfo = this.collectResults(
                result,
                resultsAVG,
                resultsSTD
            );

            this.table.push([
                resultIndex+1,
                systemInfo.name,
                systemInfo.run,
                systemInfo.time,
                systemInfo.timeAVG,
                systemInfo.timeSTD,

                systemInfo.memoryUsage,
                systemInfo.memoryAvgUsage,
                systemInfo.memorySTDUsage,
                
                systemInfo.cpuUsage,
                systemInfo.cpuAvgUsage,
                systemInfo.cpuSTDUsage,
                
                systemInfo.processPID,
            ]);
        }

        console.log(this.table.toString());
    }

    private collectResults(result: Result, resultsAVG: Result, resultsSTD: Result): CollectResults {
        return {
            processPID: result.processPID,
            name: result.name,
            run:result.run,

            cpuUsage: result.cpu.toFixed(3) + " MS",
            cpuAvgUsage: resultsAVG.cpu.toFixed(3) + " MS",
            cpuSTDUsage: resultsSTD.cpu.toFixed(3) + " %",

            memoryUsage: result.ram.toFixed(3) + " MB",
            memoryAvgUsage: resultsAVG.ram.toFixed(3) + " MB",
            memorySTDUsage: resultsSTD.ram.toFixed(3) + " %",

            time: result.time.toFixed(3) + " MS",
            timeAVG: resultsAVG.time.toFixed(3) + " MS",
            timeSTD: resultsSTD.time.toFixed(3) + " %"
        };
    }
}