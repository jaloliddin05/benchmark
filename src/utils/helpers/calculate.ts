import { Result} from "../../types/argument/interface";

export class Calculator {

    public findAvg(results: Result[]): Result {
        const [result] = results;
        
        const resultCount = results.length;

        const avgCpuUsage = results.map(r=>r.cpu).reduce((a,b)=>a+b) / resultCount;
        const avgMemoryUsage = results.map(r=>r.ram).reduce((a,b)=>a+b) / resultCount;
        const avgSpeedTime = results.map(r=>r.time).reduce((a,b)=>a+b) / resultCount;

        return {
            processPID: result.processPID,
            name: result.name,
            cpu: avgCpuUsage,
            ram: avgMemoryUsage,
            time: avgSpeedTime,
            run:result.run
        };
    }

    public findDevision(results: Result[], resultsAvg: Result): Result[] {
        const resultCount = results.length;

        const resultsSTDs: Result[] = [];

        for (let count = 0; count < resultCount; count++) {
            const result = results[count];

            resultsSTDs.push({
                processPID: result.processPID,
                name: result.name,
                cpu:   (resultsAvg.cpu - result.cpu) / resultsAvg.cpu * 100,
                ram: (resultsAvg.ram - result.ram) / resultsAvg.ram * 100,
                time: (resultsAvg.time - result.time) / resultsAvg.time * 100,
                run:result.run
            });
        }

        return resultsSTDs;
    }
}