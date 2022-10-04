import {Message,Result} from "../../types/argument/interface";

export class Child {
    constructor() {
        process.on('message', (message: Message) => {
            this.run(message);
        });
    }

    private async run(message: Message): Promise<void> {
        
        const func = new Function("return " + message.func)()

        const before = Date.now();
        const beforeCpuUsage = process.cpuUsage();

        for (let i = 0; i < message.iterations; i++) {
            func();
        }

        const after = Date.now();
        

        this.sendResult({
            processPID: process.pid,
            run:message.runsCount,
            name: message.funcName,
            cpu: process.cpuUsage(beforeCpuUsage).user / 1e3,
            ram: ((process.memoryUsage()).heapUsed / 1024 / 1024),
            time: after - before
        });
    }

    private sendResult(results: Result): void {
        process.send?.(results);
    }
}

new Child();