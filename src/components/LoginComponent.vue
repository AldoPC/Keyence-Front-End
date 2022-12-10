<template>
  <div class="row justify-content-center my-5 width-fix">
    <div class="col-md-6">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="login(account)">
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
          <div class="col-12 mb-3">
            <router-link to="/register"
              ><span>Already have an account?</span></router-link
            >
          </div>
          <div class="col-12">
            <button class="btn btn-primary me-2" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import type IAccount from "../interface/IAccount";

export default {
  data() {
    return {
      account: {} as IAccount,
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>
