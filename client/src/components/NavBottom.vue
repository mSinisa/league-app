<template>
  <nav class="navbar fixed-bottom">
    <i v-if="loggedIn" class="fas fa-lock-open nav-link" @click="logout"></i>
    <router-link v-else :to="{ name: 'Login' }" class="nav-link">
      <i class="fas fa-lock"></i>
    </router-link>

    <router-link :to="{ name: 'About' }" class="nav-link">
      <i class="fas fa-table"></i>
    </router-link>
  </nav>
</template>

<script>
import { authComputed } from "../store/helpers";
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
  height: 8vh;
}
</style>
