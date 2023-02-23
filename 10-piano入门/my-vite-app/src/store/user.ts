/**
 * 所以，大家理解这种组合式编程的思想更重要，pinia无非就是以下3个大点：
    state
    getters
    actions
 */


import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
// 利用defineStore函数创建了一个store，该函数第二个参数是一个options配置项，我们需要存放的数据就放在options对象中的state属性内。
export const useUsersStore = defineStore('users', {
  // 其他配置项
  // 利用defineStore函数创建了一个store，该函数第二个参数是一个options配置项，我们需要存放的数据就放在options对象中的state属性内。
  state: () => {
    return {
      name: '小猪课堂',
      age: 25, 
      sex: '男'
    }
  },

  // getter属性值是一个对象，该对象里面是各种各样的方法
  // 它的作用就是返回一个新的结果，类似于计算属性
  getters: {
    getAddAge: (state) => {
      return state.age + 1
    },
    getNameAndAge (): string {
      // 调用其他的 getter
      return this.name + this.getAddAge;
    },
    getAddAgeParam: (state) => {
      return (num: number) => state.age + num
    }
  },

  // actions属性里面，该属性就和我们组件代码中的methods相似，用来放置一些处理业务逻辑的方法。
  // actions属性值同样是一个对象，该对象里面也是存储的各种各样的方法，包括同步方法和异步方法。
  // 把actions方法当作一个普通的方法即可，特殊之处在于该方法内部的this指向的是当前store
  actions: {
    saveName (name: string) {
      this.name = name
    }
  }
})