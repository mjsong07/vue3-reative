 import { track,trigger } from './effect.js'
 
 export function reactive(obj) {
    if (typeof obj!=='object') {
        return obj
    }
    return new Proxy(obj,handles)
}


const createGetFn = () => {
    return function get(target,key,receiver){
        const res = Reflect.get(target,key,receiver)
        track(target,key)
        // console.log("get",target[key])
        if (typeof res ==='object') {
            return reactive(res)
        }
        return res
    }
}
const createSetFn = () => {
    return function set(target,key,value,receiver){
        const res = Reflect.set(target,key,value,receiver)
        trigger(target,key)
        // console.log("set",value)
        return res
    }
}

const get = createGetFn()
const set = createSetFn()
const handles = {get,set} //注意这里必需是 get set 不能自己重命名
