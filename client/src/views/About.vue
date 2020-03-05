<template>
  <div class="hello">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers";
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      // console.log('logout')
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.hello {
  margin: 8vh 0;
}
</style>
