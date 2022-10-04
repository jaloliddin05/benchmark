"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowTable = void 0;
const Table = require("cli-table");
class ShowTable {
    constructor(results, resultsAVG, resultsSTDs) {
        this.results = results;
        this.resultsAVG = resultsAVG;
        this.resultsSTDs = resultsSTDs;
        this.table = new Table({ head: ["", "name", "run", "time", "avgTime", "timeDevition", "ram", "avgRam", "ramDevition", "cpu", "avgCpu", "cpuDevition", "pID"] });
    }
    show() {
        for (let resultIndex = 0; resultIndex < this.results.length; resultIndex++) {
            const result = this.results[resultIndex];
            const resultsAVG = this.resultsAVG;
            const resultsSTD = this.resultsSTDs[resultIndex];
            const printedResult = this.print(result, resultsAVG, resultsSTD);
            this.table.push([
                resultIndex + 1,
                printedResult.name,
                printedResult.run,
                printedResult.time,
                printedResult.timeAVG,
                printedResult.timeSTD,
                printedResult.memoryUsage,
                printedResult.memoryAvgUsage,
                printedResult.memorySTDUsage,
                printedResult.cpuUsage,
                printedResult.cpuAvgUsage,
                printedResult.cpuSTDUsage,
                printedResult.processPID,
            ]);
        }
        console.log(this.table.toString());
    }
    print(result, resultsAVG, resultsSTD) {
        return {
            processPID: result.processPID,
            name: result.name,
            run: result.run,
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
exports.ShowTable = ShowTable;
