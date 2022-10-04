#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argumentParser_1 = require("./utils/validation/argumentParser");
const calculate_1 = require("./utils/helpers/calculate");
const benchmark_1 = require("./bin/benchmark");
const showTable_1 = require("./utils/helpers/showTable");
async function start() {
    try {
        const command = new argumentParser_1.ArgumentHelper(process.argv).parseArguments();
        const calculator = new calculate_1.Calculator();
        const benchmark = new benchmark_1.Benchmark(command, calculator);
        const { results, resultsAVG, resultsSTDs } = await benchmark.run();
        const cmdTable = new showTable_1.ShowTable(results, resultsAVG, resultsSTDs);
        cmdTable.show();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
    }
}
start();
