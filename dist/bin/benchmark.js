"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benchmark = void 0;
const child_process_1 = require("child_process");
class Benchmark {
    constructor(command, calculator) {
        this.command = command;
        this.calculator = calculator;
    }
    async run() {
        const results = [];
        const functionsCollection = require(process.cwd() + "/" + this.command.path);
        for (let func in functionsCollection) {
            const testResults = await this.runTest(functionsCollection[func], functionsCollection[func].name);
            results.push(this.calculator.calculateAvg(testResults));
        }
        const resultsAVG = this.calculator.calculateAvg(results);
        const resultsSTDs = this.calculator.calculateSTD(results, resultsAVG);
        return {
            results,
            resultsAVG,
            resultsSTDs
        };
    }
    async runTest(func, funcName) {
        let results = [];
        for (let i = 0; i < this.command.runsCount; i++) {
            const message = {
                func: func.toString(),
                iterations: this.command.iterationsCount,
                funcName,
                runsCount: this.command.runsCount
            };
            try {
                const result = await this.getResult(message);
                results.push(result);
            }
            catch (error) {
                console.log(error);
            }
        }
        return results;
    }
    async getResult(message) {
        const child = (0, child_process_1.fork)(__dirname + "/../lib/process/runProcess");
        return new Promise((resolve, reject) => {
            child.on("error", (error) => {
                reject(error);
            });
            child.on("close", (error) => {
                reject(error);
            });
            child.on("message", (result) => {
                resolve(result);
                child.kill();
            });
            child.send(message);
        });
    }
}
exports.Benchmark = Benchmark;
