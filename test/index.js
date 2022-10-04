
const ForOf = async()=>{
    let LEN = 1000
    let c = 0
    const arr = new Array(LEN).fill(4);
    for(let i of arr){
        c+= i
    }
    return c
}

const forClassic = ()=>{
    let LEN = 1000
    let c = 0
    const arr = new Array(LEN).fill(4);
    for(let i= 0; i< LEN;i++){
        c+= arr[i]
    }
    return c
}

const return5 = async()=>{
  return  4
}

const f = ()=>{
 return 5
}

module.exports = {ForOf,forClassic,return5,f}

