<template>
  <div class="hello">
    <form>
      <div class="form-group">
        <label for="name">Team Name</label>
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
// import { mapState } from "vuex";
import services from "../../services/event-service";

export default {
  //   props: ["dayId"],
  //     dayId
  //   },
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
        .createTeam(
          { name: this.name, description: this.description },
          this.$route.params.dayId,
          this.$route.params.divisionId
        )
        .then(res => {
          if (res.status === 200) {
            this.$router.push({ name: "AdminHome" });
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // this.$store.dispatch("getDays");
  },
  computed: {
    // ...mapState(["days"])
  }
};
</script>

<style scoped>
.hello {
  margin: 8vh 0;
}
</style>
