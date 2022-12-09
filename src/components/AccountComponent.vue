<template>
  <div class="justify-content-center d-flex flex-column pt-5">
    <h3 class="text-center">Account Details</h3>
    <img
      src="https://www.gravatar.com/avatar/00000000000000000300000000000000?d=retro"
      class="img-fluid rounded mx-auto d-block pt-4"
      alt="Image Profile"
    />
    <h4 class="text-center pt-2">Username: {{ account.username }}</h4>
    <h4 class="text-center pt-1">Email: {{ account.email }}</h4>
    <h4 class="text-center pt-1">Password: *******</h4>
    <button class="btn btn-primary button-width mx-auto" @click="edit">
      Edit
    </button>
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
          "auth-token": localStorage.getItem("token"),
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
    edit() {
      this.$router.push("/account/" + this.account._id);
    },
  },
};
</script>
