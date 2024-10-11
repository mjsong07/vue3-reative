import { effect,trigger,track } from './effect'
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
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
              if (!this._dirty) {
                this._dirty = true
                trigger(this, 'value')
              }
            },
        })
    }
    get value() {
        if(this._dirty) {
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