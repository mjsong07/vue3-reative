import {  track, trigger } from './effect'
import { reactive } from './reactive'
export function ref(obj) {
    console.log("obj.__isRef",obj.__isRef)
    if(obj.__isRef) { //缓存优化 下次重复传入会忽略
        console.log("命中缓存，直接返回")
        return obj
    }
    return new RefImpl(obj)
}
class RefImpl {
    constructor(obj) {
        this.__isRef = true //缓存优化 
        this._value = chkToRective(obj)
    }
    get value() { 
        track(this, 'value')  
        return this._value
    }
    set value(newVal) {
        if (this._value !== newVal) { 
            this._value = chkToRective(newVal) 
            trigger(this, 'value')
        }
    } 
}
const chkToRective = (val) => {
    if (typeof val === 'object') {
      return reactive(val)
    }
    return val
}