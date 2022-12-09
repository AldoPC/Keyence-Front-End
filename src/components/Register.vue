<template>
  <div class="container-fluid">
  <div class="row justify-content-center my-5">
    <div class="col-md-6">
      <h3 class="text-center">Register</h3>
      <form @submit.prevent="register(account)">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingUsername"
            v-model="account.username"
            required
            placeholder="Username"
          />
          <label for="floatingUsername">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingEmail"
            v-model="account.email"
            required
            placeholder="Email"
          />
          <label for="floatingEmail">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            v-model="account.password"
            required
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="row">
          <div class="col-12">
              <button class="btn btn-primary me-2" type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import {mapActions} from "vuex";
import type IAccount from "../interface/IAccount";

export default {
  data() {
    return {
      account: {} as IAccount,
    };
  },
  methods: {
    ...mapActions(['register']),
      
    },
  };
</script>
