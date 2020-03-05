<template>
  <div class="hello">
    <form>
      <div class="form-group">
        <label for="name">Play Day</label>
        <input type="text" class="form-control" name="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          name="description"
          v-model="description"
        />
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-large" @click.prevent="create">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import services from "../../services/event-service";

export default {
  // name: "NewDay",
  data() {
    return {
      name: null,
      description: null,
      message: null
    };
  },
  methods: {
    create() {
      services
        .createDay({ name: this.name, description: this.description })
        .then(res => {
          if (res.data.status == 201) {
            this.$router.push({
              name: "AdminHome"
            });
          } else {
            this.message = res.data.message;
            this.$router.push({
              name: "Login"
            });
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  updated() {}
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
