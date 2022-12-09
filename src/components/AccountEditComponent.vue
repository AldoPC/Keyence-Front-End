<template>
  <div class="row justify-content-center pt-5">
    <div class="col-md-6">
      <h3 class="text-center">Edit Account Details</h3>
      <form @submit.prevent="handleUpdateForm">
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
        <div class="mb-3">
          <button class="btn btn-primary me-2" type="submit">Update</button>
          <router-link to="/"
            ><button class="btn btn-danger">Cancel</button></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import type IAccount from "../interface/IAccount";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      token: (state: any) => state.token,
    }),
  },
  data() {
    return {
      account: {} as IAccount,
    };
  },
  created() {
    const apiURL = "http://localhost:3000/api/auth/account";
    axios
      .get(apiURL, {
        headers: {
          "auth-token": this.token,
        },
      })
      .then((response) => {
        this.account = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleUpdateForm() {
      const apiURL = "http://localhost:3000/api/auth/" + this.$route.params.id;
      axios
        .put(apiURL, this.account, {
          headers: {
            "auth-token": this.token,
          },
        })
        .then(() => {
          this.$router.push("/view");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
