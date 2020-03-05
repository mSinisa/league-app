<template>
  <div class="hello">
    <form>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          name="firstName"
          v-model="firstName"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          name="lastName"
          v-model="lastName"
        />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone # (optional)</label>
        <input
          type="number"
          class="form-control"
          name="phoneNumber"
          v-model="phoneNumber"
        />
      </div>
      <label>Teams</label>
      <div class="input-group mb-3" v-if="teams.length > 1">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"
            >Select:
          </label>
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="teamName"
        >
          <!-- <option selected>Choose...</option> -->
          <option
            v-for="team in teams"
            :key="team"
            :value="team"
            name="teamName"
            >{{ team }}</option
          >
          <!-- <option value="2">Two</option> -->
          <!-- <option value="3">Three</option> -->
        </select>
      </div>

      <!-- <div class="form-group">
                <label for="teamCode">Team Code</label>
                <input type="text" class="form-control" name="teamCode" />
            </div> -->
      <div class="form-group">
        <label for="lastName">Email</label>
        <input type="email" class="form-control" name="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <button @click.prevent="register" class="btn btn-danger btn-large">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      teams: [],
      email: null,
      password: null,
      phoneNumber: null,
      firstName: null,
      lastName: null,
      teamName: null
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(() => {
          this.$router.push({ name: "About" });
        });
    }
  },
  created() {
    // this.getTeams()
  }
};
</script>

<style scoped>
.hello {
  margin: 10vh 0;
}
.btn {
  width: 100%;
  margin-bottom: 15px;
}
</style>
