#!/usr/bin/env node
import {ArgumentHelper} from "./utils/validation/argumentParser";
import { Calculator } from "./utils/helpers/calculate";
import {Benchmark} from "./bin/benchmark";
import {ShowTable} from "./utils/helpers/showTable";

async function start() {
    try {

        const command = new ArgumentHelper(process.argv).parseArguments();

        const calculator = new Calculator();

        const benchmark = new Benchmark(command, calculator);

        const {
            results,
            resultsAVG,
            resultsSTDs
        } = await benchmark.run();

        const cmdTable = new ShowTable(
            results,
            resultsAVG,
            resultsSTDs
        );

        cmdTable.show();

        process.exit(0)
    }
    catch (err){
        console.log(err);
    }
}

start();

