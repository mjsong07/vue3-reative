

let activeEffect 
export function effect(fn, options = {}) {
    // effect嵌套，通过队列管理
    const effectFn = () => {
      try {
        activeEffect = effectFn
        //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
        return fn()
      } finally {
        activeEffect = null
      }
    }
    if (!options.lazy) { 
      effectFn()
    }
    effectFn.scheduler = options.scheduler // 延迟执行
    return effectFn
}
  

const targetMap = new WeakMap() //设置外层大map关联所有对象
 

//收集依赖
export function track(target,key) {
    let depsMap = targetMap.get(target) // 获取具体对象map
    if(!depsMap) { 
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    //设置具体对象对应的属性关联effect方法map
    let effectSet = depsMap.get(key) 
    if(!effectSet) {
        effectSet = new Set()
    }
    if(!effectSet.has(activeEffect) && activeEffect) {
        effectSet.add(activeEffect)
    }
    
    depsMap.set(key,effectSet) 
}
 
//触发依赖
export function trigger(target,key) {
    const depsMap = targetMap.get(target)
    if(!depsMap) {
        return 
    }
    const effectSet = depsMap.get(key)
    if(!effectSet) {
        return 
    }
    effectSet && effectSet.forEach(fn => {
        if(typeof fn === 'function'){ 
          if (fn.scheduler) {
            fn.scheduler()
          } else {
            fn()
          }
        } 
    })
}