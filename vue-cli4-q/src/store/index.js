import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)

const LStore = {
  state:{
    name:"lindong",
    age:22
  },
  getters:{
    getLAge(state){
      return state.age
    }
  },
  mutations:{
    increase(state,playload){
      state.age += playload.number;
    }
  },
  actions:{
    AsIncrease({commit}){
      commit("increase")
    }
  }
}

// const SStore = {
//   state:{
//     name:"songjing",
//     age:18
//   },
//   getters:{
//     getSAge(state){
//       return state.age
//     }
//   },
//   mutations:{
//     increase(state,playload){
//       state.age += playload.number;
//     }
//   },
//   actions:{
//     AsIncrease({commit}){
//       commit("increase")
//     }
//   }
// }


// const modules = {
//   "ld":LStore,
//   "sj":SStore
// }


export default new Vuex.Store(LStore)
