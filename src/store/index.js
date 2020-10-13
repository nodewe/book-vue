import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存一个用户名变量
    uid:""
  },
  mutations: {
    //改变用户名变量的函数
    setUid(state,uid){
      state.uid=uid
    },
    //改变头像的函数
    setAvatar(state,avator){
      state.avator=avator
    }
  },
  actions: {
  },
  modules: {
  }
})
