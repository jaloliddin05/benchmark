import*as fs from "fs"
import {Arguments} from "../../types/argument/interface"

export class ArgumentHelper {
    private __arg
    constructor(argv: string[]){
      this.__arg = argv
    }

    parseArguments(){
       const [,,...param] = this.__arg
       return this.validateArguments(param)
    }

    private validateArguments(params):Arguments{
      if(params.length < 3){
        throw new Error("Please enter all arguments: <<< benchmark  path  iterationsCount runsCount  >>>")
      }
      return this.checkArguments(params)
    }

    private checkArguments(params){
     const path = params[0]
     const iterCount = params[1]
     const runCount = params[2]
     if(!fs.existsSync(process.cwd() + "/" + path)){
        throw new Error("file not found")
     }else if(isNaN(Number(iterCount))){
        throw new Error('Iterations count must be number')
     }else if(isNaN(Number(runCount))){
        throw new Error( 'runs count must be number')
     }
     return {path:params[0],iterationsCount:+params[1],runsCount:+params[2]}
    }
}