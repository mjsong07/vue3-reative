import { describe, it, expect } from 'vitest'
import { effect } from '../effect'
import { reactive } from '../reactive'
import { ref } from '../ref'
import { computed } from '../computed' 
 
describe('computed测试',()=>{
  it('computed基本使用',()=>{
    const ret = reactive({ count: 1 })
    const num = ref(2)
    const sum = computed(() => num.value + ret.count)
    expect(sum.value).toBe(3)
    // ret.count++
    // expect(sum.value).toBe(4)
    // num.value = 10
    // expect(sum.value).toBe(12)
  })
  // it('computed属性修改',()=>{
  //   const author = ref('xxxx')
  //   const course = ref('yyyy')
  //   const title = computed({
  //     get(){
  //       return author.value+":"+course.value
  //     },
  //     set(val){
  //       [author.value,course.value] = val.split(':')
  //     }
  //   })
  //   expect(title.value).toBe('xxxx:yyyy')
  //   author.value="aaa"
  //   course.value="bbb"
  //   expect(title.value).toBe('aaa:bbb')
  //   //计算属性赋值
  //   title.value = 'cc:dd'
  //   expect(author.value).toBe('cc')
  //   expect(course.value).toBe('dd')
  // })
})


