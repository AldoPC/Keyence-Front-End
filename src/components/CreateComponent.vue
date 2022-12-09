<template>
  <div class="row justify-content-center pt-5 width-fix">
    <div class="col-md-6">
      <h3 class="text-center">Create User</h3>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="floatingId"
            v-model="user.user_id"
            required
            placeholder="User ID"
          />
          <label for="floatingId">User ID</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingUsername"
            v-model="user.username"
            required
            placeholder="Username"
          />
          <label for="floatingUsername">User Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="floatingDate"
            v-model="user.date"
            required
            placeholder="Date"
          />
          <label for="floatingDate">Date</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="time"
            class="form-control"
            id="floatingPunchIn"
            v-model="user.punch_in"
            required
            placeholder="Punch In"
          />
          <label for="floatingPunchIn">Punch In</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="time"
            class="form-control"
            id="floatingPunchOut"
            v-model="user.punch_out"
            required
            placeholder="Punch Out"
          />
          <label for="floatingPunchOut">Punch Out</label>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary me-2" type="submit">Create</button>
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
import { mapState } from "vuex";
import type IUser from "../interface/IUser";
export default {
  computed: {
    ...mapState({
      token: (state: any) => state.token,
    }),
  },
  data() {
    return {
      user: {} as IUser,
    };
  },
  methods: {
    handleSubmitForm() {
      const apiURL = "https://keyence-back-end.onrender.com/api/users";
      axios
        .post(apiURL, this.user, {
          headers: {
            "auth-token": this.token,
          },
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
