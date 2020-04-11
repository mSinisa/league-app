<template>
  <div class="hello">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers"
import services from '../services/event-service'
export default {
  computed: {
    ...authComputed
  },
  methods: {
    getEvents() {
      services.getEvents()
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    // logout() {
    //   // console.log('logout')
    //   this.$store.dispatch("logout");
    // }
  },
  created(){
    this.getEvents()
  }
};
</script>

<style scoped>
.hello {
  margin: 8vh 0;
}
</style>
