// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    tasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setUser', null);
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getTasks: (state) => state.tasks,
  },
});

export default store;
