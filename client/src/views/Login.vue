<template>
  <div class="hello">
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" name="email" v-model="email" />
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
      <div class="text-center">
        <button @click.prevent="login" class="btn btn-primary btn-large">
          Login
        </button>
      </div>
    </form>
    <div class="text-center">
      Don't have an account yet?
      <router-link :to="{ name: 'Register' }">
        Register
      </router-link>
    </div>
  </div>
</template>

<!-- <template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Username" prepend-icon="mdi-account-circle" />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
-->
<script>
// import axios from "axios";

export default {
  data() {
    return {
      email: null,
      password: null,
      currentUser: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "About" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 10vh 0;
}

.btn {
  width: 100%;
  margin-bottom: 15px;
}
</style>
