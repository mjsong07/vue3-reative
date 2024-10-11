import { describe, it, expect } from 'vitest'
import { effect } from '../effect'
import { reactive } from '../reactive'
describe('响应式测试', () => {
  it('reactive测试', () => { 
    const ret = reactive({ num: 0 })
    let val
    const a = effect(() => {
      val = ret.num
    })
    console.log("a",a) 
    expect(val).toBe(0)
    ret.num++
    debugger
    expect(val).toBe(1)
    ret.num = 12
    expect(val).toBe(12)

  //嵌套测试
    const ret2 = reactive({ obj2: {num2:0} })
    let val2
    effect(() => {
      val2 = ret2.obj2.num2
    }) 
    expect(val2).toBe(0)
    ret2.obj2.num2++
    expect(val2).toBe(1) 
  })
 
}) 

  