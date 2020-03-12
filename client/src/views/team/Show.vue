<template>
  <div class="hello">
    <div v-if="team">
      <h4>{{ team.team.name }}</h4>
    </div>

    <p v-if="division">Divison: {{ division.name }}</p>

    <h5>Players</h5>

    <div
      class="d-flex flex-row justify-content-around"
      v-if="showPlayerActions"
    >
      <i @click="openPlayerInput" class="fas fa-plus-circle"
        ><span>Add Player</span></i
      >
      <i class="fas fa-minus-circle"><span>Remove Player</span></i>
    </div>

    <div v-if="showPlayerInput">
      <div v-if="allPlayers" class="mt-3 section">
        <div
          class="d-flex flex-row justify-content-end align-items-center"
          @click="hidePlayerInput"
        >
          <i class="far fa-times-circle"></i>
          <span class="ml-1">Close</span>
        </div>
        <label for="playerToAdd">Select player:</label>
        <select class="custom-select" id="playerToAdd" v-model="selectedPlayer">
          <option v-for="player in allPlayers.allPlayers" :value="player._id">
            {{ player.firstName }} {{ player.lastName }}
          </option>
        </select>
        <button class="btn btn-outline-success mt-3" @click.prevent="addToTeam">
          Go
        </button>
        <span v-if="message"
          >{{ message }} <i @click="hideMessage" class="far fa-times-circle"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      message: null,
      selectedPlayer: null,
      showPlayerActions: true,
      showPlayerInput: false
    };
  },
  methods: {
    openPlayerInput() {
      this.showPlayerActions = false;
      this.showPlayerInput = true;
    },
    hidePlayerInput() {
      this.showPlayerActions = true;
      this.showPlayerInput = false;
    },
    addToTeam() {
      if (!this.selectedPlayer) {
        this.message = "Please select a player to add";
      } else {
      }
    },
    hideMessage() {
      this.message = null;
    }
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

<style scoped>
.hello {
  margin: 8vh 0;
}

.section {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 20px 0;
}
</style>
