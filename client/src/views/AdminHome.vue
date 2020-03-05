<template>
  <div class="hello">
    <div class="card border-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header">Leagues</div>
      <div class="card-body text-secondary">
        <div>
          <router-link :to="{ name: 'NewDay' }" class="d-flex flex-row">
            <i class="far fa-plus-square fa-2x"></i>
            <p class="ml-3">Add new league</p>
          </router-link>
        </div>
        <div class="d-flex flex-row" v-if="days">
          <button
            v-for="day in days.days"
            :key="day._id"
            class="btn btn-outline-dark mx-2"
            @click.prevent="showDivisions(day._id)"
          >
            {{ day.name }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="card border-secondary mb-3"
      style="max-width: 18rem;"
      v-if="displayDivisions"
    >
      <div class="card-header">Divisions</div>
      <div class="card-body text-secondary">
        <div>
          <router-link
            :to="{ name: 'NewDivision', params: { dayId: dayId } }"
            class="d-flex flex-row"
          >
            <i class="far fa-plus-square fa-2x"></i>
            <p class="ml-3">Add new division</p>
          </router-link>
        </div>
        <div class="d-flex flex-row" v-if="days">
          <button
            v-for="day in days.days"
            :key="day._id"
            class="btn btn-outline-dark mx-2"
          >
            {{ day.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dayId: null,
      displayDivisions: false
    };
  },
  methods: {
    showDivisions(dayId) {
      this.displayDivisions = true;
      this.dayId = dayId;
      console.log(dayId);
    }
  },
  created() {
    this.$store.dispatch("getDays");
  },
  computed: {
    ...mapState(["days"])
  }
};
</script>

<style scoped>
.hello {
  margin: 8vh 0;
}

.btn {
  width: 100%;
  margin-bottom: 15px;
}

.card {
  margin: 0 auto;
}
</style>
