<template>
  <div class="justify-content-center container-fluid">
    <h1>User Entries</h1>
    <div class="row">
      <div class="col-md-12">
        <div
          class="table-responsive table-scroll mb-3 sticky-table"
          data-mdb-perfect-scrollbar="true"
        >
          <table class="table table-hover">
            <thead class="table-dark table-head">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="userItem in Users" :key="userItem._id">
                <td>{{ userItem.user_id }}</td>
                <td>{{ userItem.username }}</td>
                <td>{{ userItem.date }}</td>
                <td>{{ userItem.punch_in }}</td>
                <td>{{ userItem.punch_out }}</td>
                <td>
                  <router-link
                    :to="{ name: 'edit', params: { id: userItem._id } }"
                    class="btn btn-success me-2 my-1"
                  >
                    Edit
                  </router-link>
                  <button
                    @click.prevent="deleteUser(userItem._id!)"
                    class="btn btn-danger my-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <input
          class="form-control visually-hidden"
          type="file"
          ref="file"
          id="formFile"
        />
        <button class="btn btn-primary me-2 mt-2" @click="readFile()">
          Upload from .xlsx file
        </button>
        <button class="btn btn-primary ms-1 mt-2" @click="exportCsv()">
          Export to .csv
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import type IUser from "../interface/IUser";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      token: (state: any) => state.token,
    }),
  },
  data() {
    return {
      Users: [] as IUser[],
    };
  },
  beforeMount() {
    let apiURL = "http://localhost:3000/api/users";
    axios
      .get<IUser[]>(apiURL, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.Users = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteUser(id: string) {
      let apiURL = `http://localhost:3000/api/users/${id}`;
      let indexOfArrayItem = this.Users.findIndex((i) => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL, {
            headers: {
              "auth-token": this.token,
            },
          })
          .then(() => {
            this.Users.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    readFile() {
      let fileInputElement = this.$refs.file as HTMLInputElement;
      fileInputElement.click();
      fileInputElement.onchange = () => {
        let file = fileInputElement.files![0];
        let reader = new FileReader();
        const apiURL = "http://localhost:3000/api/users/file";
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const base64String = reader.result as string;
          console.log(base64String);
          axios
            .post(
              apiURL,
              { fileData: base64String },
              {
                headers: {
                  "auth-token": this.token,
                },
              }
            )
            .then(() => {
              this.$router.go(0);
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
    },
    exportCsv() {
      let apiURL = "http://localhost:3000/api/csv/";
      axios({
        url: apiURL,
        method: "GET",
        responseType: "blob",
        headers: {
          "auth-token": this.token,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
      });
    },
  },
};
</script>
