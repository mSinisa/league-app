<template>
  <div class="hello">
    <form>
      <div class="form-group">
        <label for="name">Division Name</label>
        <input type="text" class="form-control" name="name" v-model="name" />
      </div>
      <!-- <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          name="description"
          v-model="description"
        />
      </div> -->
      <!-- <div v-if="message">
        <p>{{ message }}</p>
      </div> -->
      <div class="form-group">
        <button class="btn btn-primary btn-large" @click.prevent="create">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["dayId"],
  data() {
    return {
      name: null,
      description: null,
      message: null
    };
  },

  methods: {
    create() {
      if (this.name && this.dayId) {
        this.$store
          .dispatch("createDivision", {
            data: { name: this.name },
            dayId: this.dayId
          })
          .then(() => (this.name = null));
      } else if (!this.name) {
        let notification = {
          type: "error",
          message: "Please add Division name"
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      } else {
        let notification = {
          type: "error",
          message: "There was an error with your request"
        };
        this.$store.dispatch("notification/add", notification, { root: true });
        this.$router.push({ name: "AdminHome" });
      }
    }
  }
};
</script>

<style scoped>
.hello {
  margin: 8vh 0;
}
</style>
