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
      <!-- HHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEE -->
      <div class="card-body text-secondary">
        <div class="d-flex flex-row flex-wrap" v-if="divisions">
          <button
            v-for="division in divisions"
            :key="division._id"
            class="btn btn-outline-dark mx-2"
            @click.prevent="showTeams(division._id)"
          >
            {{ division.name }}
          </button>
        </div>
      </div>
      <div class="card-footer">
        <router-link
          :to="{ name: 'NewDivision', params: { dayId: dayId } }"
          :dayId="dayId"
          class="d-flex flex-row align-items-center"
        >
          <i class="far fa-plus-square fa-2x mr-2"></i>
          <p class="m-0">Add new division</p>
        </router-link>
      </div>
      <div class="card-footer" v-if="showDeleteAndEditDivision">
        <button @click="deleteDivision" class="btn btn-outline-danger m-0">
          Delete Division
        </button>
        <router-link
          :to="{
            name: 'EditDivision',
            params: { dayId: dayId, divisionId: divisionId }
          }"
          class="btn btn-outline-warning mt-2 mb-0 mx-0"
          :dayId="dayId"
          :divisionId="divisionId"
        >
          Edit Division
        </router-link>
      </div>
    </div>

    <div
      class="card border-secondary mb-3"
      style="max-width: 18rem;"
      v-if="displayTeams"
    >
      <div class="card-header">Teams</div>
      <div class="card-header">
        <router-link
          :to="{
            name: 'NewTeam',
            params: { dayId: dayId, divisionId: divisionId }
          }"
          class="d-flex flex-row align-items-center"
        >
          <i class="far fa-plus-square fa-2x"></i>
          <p class="ml-2 mb-0">Add new team</p>
        </router-link>
      </div>
      <div class="card-body text-secondary">
        <div class="d-flex flex-row flex-wrap" v-if="teams">
          <router-link
            v-for="team in teams"
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
            >{{ team.name }}
          </router-link>
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
      displayTeams: false,
      showDeleteAndEditDivision: false
      // divisions: null
    };
  },
  methods: {
    showDivisions(dayId) {
      this.displayDivisions = true;
      this.displayTeams = false;
      this.showDeleteAndEditDivision = false;
      this.dayId = dayId;
      this.$store.dispatch("fetchDivisions", dayId);
    },
    deleteDivision() {
      this.$store.dispatch("deleteDivision", {
        dayId: this.dayId,
        divisionId: this.divisionId
      });
      this.showDeleteAndEditDivision = false;
    },
    // editDivision() {},
    showTeams(divisionId) {
      this.displayTeams = true;
      this.divisionId = divisionId;
      this.showDeleteAndEditDivision = true;
      // console.log("divisionId: " + divisionId);
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
