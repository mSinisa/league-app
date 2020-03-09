<template>
  <div class="hello">
    <div v-if="team">
      <h1>Team page {{ team.team.name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  //   props: ["dayId", "divisionId", "teamId"],
  created() {
    // console.log(dayId);
    // console.log(this.$route.params);
    this.$store.dispatch("fetchTeam", {
      dayId: this.$route.params.dayId,
      divisionId: this.$route.params.divisionId,
      teamId: this.$route.params.teamId
    });
  },
  computed: {
    ...mapState(["team"])
  }
};
</script>

<style>
.hello {
  margin: 8vh 0;
}
</style>
