"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
class Child {
    constructor() {
        process.on('message', (message) => {
            this.run(message);
        });
    }
    async run(message) {
        const func = new Function("return " + message.func)();
        const before = Date.now();
        const beforeCpuUsage = process.cpuUsage();
        for (let i = 0; i < message.iterations; i++) {
            func();
        }
        const after = Date.now();
        this.sendResult({
            processPID: process.pid,
            run: message.runsCount,
            name: message.funcName,
            cpu: process.cpuUsage(beforeCpuUsage).user / 1e3,
            ram: ((process.memoryUsage()).heapUsed / 1024 / 1024),
            time: after - before
        });
    }
    sendResult(results) {
        process.send?.(results);
    }
}
exports.Child = Child;
new Child();
