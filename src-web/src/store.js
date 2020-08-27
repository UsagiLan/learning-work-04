import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     mail:{},
     read:false
  },
  mutations: {
    //判断该邮件是否已读
      changeReadState(state){
         if(!state.read)
         state.read=!state.read;
      },
      //传递邮件信息
      getMail(state,row){
       state.mail=row
      }
  },
  actions: {
      getMail(context,row){
        // commit调用mutations的方法
         context.commit('getMail',row)//用于提交mutations方法，传递邮件内容
      }
  }
})
