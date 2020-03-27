<template>
    <div class="hello">
        <div v-if="team">
            <h4>{{ team.name }}</h4>
            <h4 v-if="division">Divison: {{ division.name }}</h4>
            <h5>Players:</h5>
            <p v-for="player in team.players" :key="player._id">
                {{ player.firstName }} {{ player.lastName }}
            </p>
        </div>

        <div class="d-flex flex-row justify-content-around" v-if="showPlayerActions">
            <i @click="openPlayerInputAdd" class="fas fa-plus-circle"><span>Add Player</span></i>
            <i @click="openPlayerInputRemove" class="fas fa-minus-circle"><span>Remove Player</span></i>
        </div>

        <div v-if="showPlayerInputAdd">
            <div v-if="allPlayers" class="mt-3 section">
                <div class="d-flex flex-row justify-content-end align-items-center" @click="hidePlayerInput">
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
                <span v-if="message">{{ message }} <i @click="hideMessage" class="far fa-times-circle"></i></span>
                <span v-else-if="backendErrorMessage">{{ backendErrorMessage }}
                    <i @click="deleteBackendMessage" class="far fa-times-circle"></i></span>
            </div>
        </div>

        <div v-if="showPlayerInputRemove && team" class="section">
            <div class="d-flex flex-row justify-content-end align-items-center" @click="hidePlayerInput">
                <i class="far fa-times-circle"></i>
                <span class="ml-1">Close</span>
            </div>
            <label for="playerToRemove">Select player:</label>
            <select class="custom-select" id="playerToRemove" v-model="selectedPlayerToRemove">
                <option v-for="player in team.players" :value="player._id">
                    {{ player.firstName }} {{ player.lastName }}
                </option>
            </select>
            <button class="btn btn-outline-success mt-3" @click.prevent="removeFromTeam">
                Go
            </button>
            <span v-if="message">{{ message }} <i @click="hideMessage" class="far fa-times-circle"></i></span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import services from "../../services/event-service";

export default {
  data() {
    return {
      message: null,
      selectedPlayer: null,
      showPlayerActions: true,
      showPlayerInputAdd: false,
      showPlayerInputRemove: false,
      selectedPlayerToRemove: null
    };
  },
  methods: {
    openPlayerInputAdd() {
      this.showPlayerActions = false;
      this.showPlayerInputAdd = true;
    },
    hidePlayerInput() {
      this.showPlayerActions = true;
      this.showPlayerInputAdd = false;
      this.showPlayerInputRemove = false;
    },
    addToTeam() {
      if (!this.selectedPlayer) {
        this.message = "Please select a player to add";
      } else {
        this.$store.dispatch("addTeamPlayer", {
          dayId: this.$route.params.dayId,
          divisionId: this.$route.params.divisionId,
          teamId: this.$route.params.teamId,
          playerId: this.selectedPlayer
        });
      }
    },
    hideMessage() {
      this.message = null;
    },
    deleteBackendMessage() {
      this.$store.dispatch("deleteBackendErrorMessage");
    },
    openPlayerInputRemove() {
      this.showPlayerActions = false;
      this.showPlayerInputRemove = true;
    },
    removeFromTeam() {
      if (!this.selectedPlayerToRemove) {
        this.message = "Please select a player to remove";
      } else {
        this.$store
          .dispatch("removeTeamPlayer", {
            dayId: this.$route.params.dayId,
            divisionId: this.$route.params.divisionId,
            teamId: this.$route.params.teamId,
            playerId: this.selectedPlayerToRemove
          })
          .then(res => {
            this.selectedPlayerToRemove = null;
          });
      }
    }
  },
  created() {
    this.$store.dispatch("fetchTeam", {
      dayId: this.$route.params.dayId,
      divisionId: this.$route.params.divisionId,
      teamId: this.$route.params.teamId
    });
    // this.$store.dispatch("fetchDivision", {
    //   dayId: this.$route.params.dayId,
    //   divisionId: this.$route.params.divisionId
    // });
    // this.$store.dispatch("fetchAllPlayers");
  },
  computed: {
    ...mapState(["team", "division", "allPlayers", "backendErrorMessage"])
  },
  watch: {
    // team
  }
};
</script>

<style scoped>
.hello {
  margin: 10vh 0;
}

.section {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 20px 0;
}
</style>
