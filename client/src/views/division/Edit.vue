<template>
  <div class="hello">
    <h4 v-if="division" class="text-center">Division: {{ division.name }}</h4>
    <div v-if="teams">
      <h5>Teams:</h5>
      <p v-for="team in teams" :key="team._id">{{ team.name }}</p>
    </div>

    <div class="d-flex flex-row justify-content-around" v-if="showTeamActions">
      <i @click="openTeamInputAdd" class="fas fa-plus-circle"
        ><span>Add Team</span></i
      >
      <i @click="openTeamInputRemove" class="fas fa-minus-circle"
        ><span>Remove Team</span></i
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["dayId", "divisionId"],
  data() {
    return {
      showTeamActions: true
    };
  },
  methods: {
    openTeamInputAdd() {},
    openTeamInputRemove() {}
  },
  created() {
    this.$store.dispatch("fetchDivision", {
      dayId: this.dayId,
      divisionId: this.divisionId
    });
    this.$store.dispatch("fetchTeams", {
      dayId: this.dayId,
      divisionId: this.divisionId
    });
  },
  computed: {
    ...mapState(["division", "teams"])
  }
};
</script>

<style scoped>
.hello {
  margin-top: 8vh;
}
</style>
