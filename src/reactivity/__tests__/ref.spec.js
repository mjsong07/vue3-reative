import { describe, it, expect } from 'vitest'
import { effect } from '../effect'
import { ref } from '../ref'
describe('响应式测试', () => {
  it('ref测试', () => {   
    const ret3 = ref(0)
    let val3
    effect(() => {
      val3 = ret3.value
    })
    expect(val3).toBe(0)
    ret3.value++
    expect(val3).toBe(1)

    let obj = {num4:1}
    const ret4 = ref(obj)
    let val4
    effect(() => {
      val4 = ret4.value.num4
    })
    expect(val4).toBe(1)
    ret4.value.num4++
    expect(val4).toBe(2)
 
    const ret5 = ref(ret4)
    expect(ret5).toBe(ret4)  
  })
 
}) 

  