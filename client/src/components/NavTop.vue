<template>
  <nav class="navbar fixed-top">
    <router-link :to="{ name: 'Home' }" class="navbar-brand">BCTL</router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
  height: 8vh;
}
</style>
