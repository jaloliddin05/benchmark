import { fork } from "child_process";
import { Arguments, Result, Message } from "../types/argument/interface";
import { IBenchmark } from "../types/Benchmark/interface";
import { Calculator } from "../utils/helpers/calculate";

export class Benchmark implements IBenchmark {
  constructor(private command: Arguments, private calculator: Calculator) {}

  public async run(): Promise<{
    results: Result[];
    resultsAVG: Result;
    resultsSTDs: Result[];
  }> {
    const results = [];
    const functionsCollection = require(process.cwd() +
      "/" +
      this.command.path);
    for (let func in functionsCollection) {
      const testResults = await this.testFunc(
        functionsCollection[func],
        functionsCollection[func].name
      );

      results.push(this.calculator.findAvg(testResults));
    }

    const resultsAVG = this.calculator.findAvg(results);

    const resultsSTDs = this.calculator.findDevision(results, resultsAVG);

    return {
      results,
      resultsAVG,
      resultsSTDs,
    };
  }

  private async testFunc(func: Function, funcName: string): Promise<Result[]> {
    let results = [];

    for (let i = 0; i < this.command.runsCount; i++) {
      const message: Message = {
        func: func.toString(),
        iterations: this.command.iterationsCount,
        funcName,
        runsCount: this.command.runsCount,
      };

      try {
        const result = await this.getResult(message);
        results.push(result);
      } catch (error) {
        console.log(error);
      }
    }

    return results;
  }

  private async getResult(message: Message): Promise<Result> {
    const myChild = fork(__dirname + "/../lib/process/runProcess");

    return new Promise((resolve, reject) => {
      myChild.on("error", (error) => {
        reject(error);
      });

      myChild.on("close", (error) => {
        reject(error);
      });

      myChild.on("message", (result: Result) => {
        resolve(result);
        myChild.kill();
      });

      myChild.send(message);
    });
  }
}
