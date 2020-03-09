<template>
  <div class="hello">
    <div v-if="team">
      <h4> {{ team.team.name }}</h4>
    </div>
    <p v-if="division">Divison: {{ division.name }}</p>
    <p>Players:</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("fetchTeam", {
      dayId: this.$route.params.dayId,
      divisionId: this.$route.params.divisionId,
      teamId: this.$route.params.teamId
    })
    this.$store.dispatch('fetchDivision', {dayId: this.$route.params.dayId, divisionId: this.$route.params.divisionId})
  },
  computed: {
    ...mapState(["team", "divisions", "division"])
  }
};
</script>

<style>
.hello {
  margin: 8vh 0;
}
</style>
