<template>
  <div class="hello">
    <div class="card border-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header">Leagues</div>
      <div class="card-body text-secondary">
        <div>
          <!-- <router-link :to="{ name: 'NewDay' }" class="d-flex flex-row">
            <i class="far fa-plus-square fa-2x"></i>
            <p class="ml-3">Add new league</p>
          </router-link> -->
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
          <!-- <router-link
            :to="{ name: 'NewDivision', params: { dayId: dayId } }"
            class="d-flex flex-row"
          >
            <i class="far fa-plus-square fa-2x"></i>
            <p class="ml-3">Add new division</p>
          </router-link> -->
        </div>
        <div class="d-flex flex-row flex-wrap" v-if="divisions">
          <button
            v-for="division in divisions.divisions"
            :key="divisions._id"
            class="btn btn-outline-dark mx-2"
            @click.prevent="showTeams(division._id)"
          >
            {{ division.name }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="card border-secondary mb-3"
      style="max-width: 18rem;"
      v-if="displayTeams"
    >
      <div class="card-header">Teams</div>
      <div class="card-body text-secondary">
        <div>
          <router-link
            :to="{
              name: 'NewTeam',
              params: { dayId: dayId, divisionId: divisionId }
            }"
            class="d-flex flex-row"
          >
            <i class="far fa-plus-square fa-2x"></i>
            <p class="ml-3">Create new team</p>
          </router-link>
        </div>
        <div class="d-flex flex-row flex-wrap" v-if="teams">
          <!-- <button
            v-for="team in teams.teams"
            :key="team._id"
            class="btn btn-outline-dark mx-2"
          >
            {{ team.name }}
          </button> -->

          <router-link
            v-for="team in teams.teams"
            :key="team._id"
            :to="{
              name: 'ShowTeam',
              params: {
                dayId: dayId,
                divisionId: divisionId,
                teamId: team._id
              }
            }"
            class="btn btn-outline-dark mx-2"
            >{{ team.name }}</router-link
          >
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
      displayDivisions: false,
      displayTeams: false
      // divisions: null
    };
  },
  methods: {
    showDivisions(dayId) {
      this.displayDivisions = true;
      this.displayTeams = false;
      this.dayId = dayId;
      this.$store.dispatch("fetchDivisions", dayId);
    },
    showTeams(divisionId) {
      this.displayTeams = true;
      this.divisionId = divisionId;
      console.log("divisionId: " + divisionId);
      this.$store.dispatch("fetchTeams", {
        dayId: this.dayId,
        divisionId: this.divisionId
      });
    }
  },
  created() {
    this.$store.dispatch("getDays");
  },
  computed: {
    ...mapState(["divisions", "days", "teams"])
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
