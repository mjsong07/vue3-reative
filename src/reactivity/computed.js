import { effect} from './effect.js'
export function computed(fnOrOptions) {
    let getter,setter;
    if( typeof fnOrOptions === 'function') {
        getter = fnOrOptions
        setter = () => {
            console.warn('computed value must be readonly')
        }
    }else{
        getter = fnOrOptions.get
        setter = fnOrOptions.set
    }
    return new ComputedRefImpl(getter,setter)
}

class ComputedRefImpl {
    constructor(getter,setter) {
        this._getter = getter
        this._setter = setter
        this._value = undefined
        this._dirty = true
        this.effect = effect(getter, { // 这里二次包裹computed内编写的代码。让里面触发的变量变成响应式， lazy为false 延迟执行
            lazy: true,
            scheduler: () => {  
               this._value = getter() 
            },
        })
    }
    get value() { 
        if(this._dirty) { // 这里重复访问 computed的xx.value 时候缓存处理
            this._dirty = false
            this._value = this.effect()
        }
        return this._value
    }
    set value(newValue) { 
        this._setter(newValue)
        this._dirty = true
    }
}