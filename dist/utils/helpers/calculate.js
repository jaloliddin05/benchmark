"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
class Calculator {
    calculateAvg(results) {
        const [result] = results;
        const resultCount = results.length;
        const avgCpuUsage = results.map(r => r.cpu).reduce((a, b) => a + b) / resultCount;
        const avgMemoryUsage = results.map(r => r.ram).reduce((a, b) => a + b) / resultCount;
        const avgSpeedTime = results.map(r => r.time).reduce((a, b) => a + b) / resultCount;
        return {
            processPID: result.processPID,
            name: result.name,
            cpu: avgCpuUsage,
            ram: avgMemoryUsage,
            time: avgSpeedTime,
            run: result.run
        };
    }
    calculateSTD(results, resultsAvg) {
        const resultCount = results.length;
        const resultsSTDs = [];
        for (let resultIndex = 0; resultIndex < resultCount; resultIndex++) {
            const result = results[resultIndex];
            resultsSTDs.push({
                processPID: result.processPID,
                name: result.name,
                cpu: (resultsAvg.cpu - result.cpu) / resultsAvg.cpu * 100,
                ram: (resultsAvg.ram - result.ram) / resultsAvg.ram * 100,
                time: (resultsAvg.time - result.time) / resultsAvg.time * 100,
                run: result.run
            });
        }
        return resultsSTDs;
    }
}
exports.Calculator = Calculator;
