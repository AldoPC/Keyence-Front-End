<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand">Keyence</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
          <div class="d-flex">
            <ul class="navbar-nav" v-if="token">
              <li class="nav-item px-2">
                <router-link class="btn btn-dark" to="/create"
                  >Create User Entry</router-link
                >
              </li>
              <li class="nav-item px-2">
                <router-link class="btn btn-dark" to="/view"
                  >View Users Entries</router-link
                >
              </li>
              <li class="nav-item px-2">
                <router-link class="btn btn-dark" to="/account"
                  >View Account Details</router-link
                >
              </li>
              <li class="nav-item px-2">
                <button class="btn btn-dark" @click="cerrarSesion">Logout</button>
              </li>
            </ul>
            <ul class="navbar-nav flex-row float-right" v-else>
              <li class="nav-item px-2">
                <router-link class="btn btn-dark" to="/login">Login</router-link>
              </li>
              <li class="nav-item px-2">
                <router-link class="btn btn-dark" to="/register">Register</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container-fluid p-0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">

import { mapActions, mapState } from "vuex";


export default {
  computed: {
    ...mapState({
      token: (state: any) => state.token}),
  },
  methods: {
    ...mapActions(["obtenerToken", 'cerrarSesion']),
    redirect() {
      if (localStorage.getItem("token")) {
        this.$router.push("/view");
      } else {
        this.$router.push("/login");
      }
    },

  },
  created() {
    this.obtenerToken();
  },
  mounted() {
    this.redirect();
  },
  updated() {
    this.redirect();
  },
};


</script>

