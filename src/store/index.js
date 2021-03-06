import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addClasss: [],
    user: null,
    courses: [],
    taken_courses: [],
    all_taken_courses: [],
    userId: "",
  },
  getters: {
    EsAdministrador: (state) => state.user == "admin@admin.cl",
  },
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
    SAVE_USER(state, email) {
      state.user = email;
    },
    GET_COURSES(state, payload) {
      state.courses = payload;
    },
    GET_TAKEN_COURSES(state, payload) {
      state.taken_courses = payload;
    },
    GET_ALL_TAKEN_COURSES(state, payload) {
      state.all_taken_courses = payload;
    },
    TAKE_COURSE(state, payload) {
      state.courses = state.courses = payload;
    },
    DELETE_RESERVATION(state, payload) {
      state.taken_courses = state.taken_courses.filter(
        (item) => item.id !== payload
      );
    },
  },
  actions: {
    async deleteItem({ commit }, item) {
      const docRef = doc(db, "addClass", item);
      await deleteDoc(docRef);

      commit("DELETE_ITEM", item);
    },
    async addItem({ commit }, addClasss) {
      try {
        await addDoc(collection(db, "addClass"), {
          cupos: addClasss.cupos,
          fecha: addClasss.fecha,
          hora: addClasss.hora,
          name: addClasss.name,
          profesor: addClasss.profesor,
          url: addClasss.url,
        });
      } catch (error) {
        console.log(error);
      }

      commit("CLASS_ADD", addClasss);
    },
    async editItem({ commit }, addClasss) {
      try {
        const docRef = doc(db, "addClass", addClasss.id);

        await updateDoc(docRef, {
          cupos: addClasss.cupos,
          fecha: addClasss.fecha,
          hora: addClasss.hora,
          name: addClasss.name,
          profesor: addClasss.profesor,
          url: addClasss.url,
        });
      } catch (error) {
        console.log(error);
      }

      commit("EDIT_ITEM", addClasss);
    },
    saveUser({ commit }, payload) {
      commit("SAVE_USER", payload);
    },
    async reservarCurso({ commit }, payload) {
      const docRef = collection(db, "cursosGuardados");

      addDoc(docRef, {
        CursosId: payload.cursoId,
        UserId: payload.usuarioId,
      });

      commit("TAKE_COURSE", payload);
    },
    // listado de los cursos disponibles para reservar
    async get_courses({ commit }) {
      try {
        const q = query(collection(db, "addClass"));

        onSnapshot(q, (querySnapshot) => {
          const courses = [];
          querySnapshot.forEach((doc) => {
            courses.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          commit("GET_COURSES", courses);
        });
      } catch (error) {
        console.log(error);
      }
    },
    // devuelve todas las reservas hechas, calculo de los cupos 
    async get_all_taken_courses({ commit }) {
      try {
        const q = query(collection(db, "cursosGuardados"));

        onSnapshot(q, (querySnapshot) => {
          const courses = [0];
          querySnapshot.forEach((doc) => {
            courses.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          commit("GET_ALL_TAKEN_COURSES", courses);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async get_taken_courses({ commit }, usuarioId) {
      try {
        const q = query(
          collection(db, "cursosGuardados"),
          where("UserId", "==", usuarioId)
        );

        onSnapshot(q, (querySnapshot) => {
          const courses = [];
          querySnapshot.forEach((doc) => {
            courses.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          commit("GET_TAKEN_COURSES", courses);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async delete_reservation(state, id) {
      try {
        const docRef = doc(db, "cursosGuardados", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
