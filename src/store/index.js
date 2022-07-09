import { addDoc, collection } from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import {db} from '../firebase';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    addClass: [],
  },
  getters: {
    EsAdministrador: (state) => state.user == "admin@admin.cl",
  },
  mutations: {
    SAVE_USER(state, email) {
      state.user = email;
    },

    ADD_CLASS(state, payload){
      state.addClass.push(payload)
    },
    
  },
  actions: {
    saveUser({ commit }, payload) {
      commit("SAVE_USER", payload);
    },
   
    
   async add_class( { commit }, editedItem ){
    try {
       await addDoc(collection (db, "addClass"),{
         name: editedItem.name,
         url: editedItem.url,
         profesor: editedItem.teacher,
         inscritos: editedItem.enroll,
         cupos: editedItem.share,
         fecha: editedItem.date,
         hora: editedItem.time,

       })
    } catch (error) {
      console.log(error)
    }
    commit ('ADD_CLASS', editedItem)
  }
  },
  modules:{

  },
  plugins: [createPersistedState()],
})
