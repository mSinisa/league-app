<template>
  <div class="hello">
    <h1>Home page</h1>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  // name: "Home",
  data() {
    return {};
  },
  methods: {
    // getData() {
    //   axios
    //     .get("http://localhost:8081/")
    //     .then(res => {
    //       console.log(res.data);
    //       // if(res.status === 401){
    //       //     this.$router.push({name: 'Login'})
    //       // }
    //     })
    //     .catch(err => {
    //       if (err.message.indexOf("status code 401") !== -1) {
    //         this.$router.push({ name: "Login" });
    //       }
    //     });
    // }
  },
  created() {
    // this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 8vh 0;
}
.btn {
  width: 100%;
  margin-bottom: 15px;
}
</style>
