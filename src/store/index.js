import { addDoc, collection } from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import {db} from '../firebase'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addClasss: [],
  },
  getters: {},
  mutations: {
    CLASS_ADD(state, payload) {
      state.addClasss.push(payload);
    },
    DELETE_ITEM(state, payload) {
      state.addClasss = state.addClasss.filter((item) => item !== payload);
    },
    EDIT_ITEM(state, payload) {
      state.addClasss = state.addClasss.map((item) =>
        item === payload ? payload : item
      );
    },
  },
  actions: {
    async class_add({ commit }, addClasss) {
      //commit("CLASS_ADD", addClasss);
      try {
        await addDoc(collection(db,"addClasss"),{
          name: addClasss.name,
          profesor: addClasss.profesor,
          url: addClasss.url,
          cupos: addClasss.cupos,
          inscritos: addClasss.inscritos,
          fecha:addClasss.fecha,
          hora: addClasss.hora,

        }) 
      } catch (error) { 
        console.log(error)
        
      }
    },
    deleteItem({ commit }, item) {
      commit("DELETE_ITEM", item);
    },
    editItem({ commit }, addClasss) {
      commit("EDIT_ITEM", addClasss);
    },
  },
  modules: {},
});
