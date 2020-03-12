<template>
  <div class="hello">
    <div v-if="team">
      <h4>{{ team.team.name }}</h4>
    </div>
    <p v-if="division">Divison: {{ division.name }}</p>

    <h5>Players</h5>

    <div class="d-flex flex-row justify-content-around">
      <i class="fas fa-plus-circle"><span>Add Player</span> </i>
      <i class="fas fa-minus-circle"><span>Remove Player</span></i>
    </div>

    <div v-if="allPlayers">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"
            >Select player</label
          >
        </div>
        <select class="custom-select" id="inputGroupSelect01">
          <option v-for="player in allPlayers.allPlayers">
            {{ player.firstName }} {{ player.lastName }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      playerSelected: null
    };
  },
  created() {
    this.$store.dispatch("fetchTeam", {
      dayId: this.$route.params.dayId,
      divisionId: this.$route.params.divisionId,
      teamId: this.$route.params.teamId
    });
    this.$store.dispatch("fetchDivision", {
      dayId: this.$route.params.dayId,
      divisionId: this.$route.params.divisionId
    });
    this.$store.dispatch("fetchAllPlayers");
  },
  computed: {
    ...mapState(["team", "division", "allPlayers"])
  }
};
</script>

<style>
.hello {
  margin: 8vh 0;
}
</style>
