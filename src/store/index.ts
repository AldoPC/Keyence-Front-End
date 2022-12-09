import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async login({ commit }, account) {
      const apiURL = "http://localhost:3000/api/auth/signin";
      axios
        .post(apiURL, account)
        .then((response) => {
          const token = response.data;
          commit("setToken", token);
          localStorage.setItem("token", token.data.token);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async register({ commit }, account) {
      const apiURL = "http://localhost:3000/api/auth/signup";
      axios
        .post(apiURL, account)
        .then((response) => {
          const token = response.data;
          commit("setToken", token);
          localStorage.setItem("token", token.data.token);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtainToken({ commit }) {
      if (localStorage.getItem("token")) {
        commit("setToken", localStorage.getItem("token"));
      } else {
        commit("setToken", null);
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
  modules: {},
});
