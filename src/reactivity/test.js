
import { effect } from './effect.js'
import { reactive } from './reactive.js' 
const ret = reactive({ num: 0 })
console.log("ret",ret)
let val
effect(() => {
    val = ret.num
    console.log("xxx")
}) 

setInterval(() => { 
    ret.num++ 
}, 1000);