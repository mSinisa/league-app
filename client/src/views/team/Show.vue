<template>
    <div class="hello">
        <div class="text-center">
            <h4 class="m-0" v-if="team">{{ team.name }}</h4>
            <span class="font-weight-light">team</span>
        </div>

        <div class="text-center">
            <h4 class="m-0" v-if="teamDivision"> {{ teamDivision.name }}</h4>
            <span class="font-weight-light">division</span>
        </div>

        <div class="text-center" v-if="team">
            <div v-if="team.players.length > 0" class="mt-4">
            <h5 v-for="player in team.players">
                {{player.firstName}} {{player.lastName}}
            </h5>
            </div>
            <p v-else class="text-secondary my-5 h5">There are no players in this team</p>
        </div>

        <div class="actions mt-4">
            <div class="addAndRemove d-flex justify-content-around">
                <button class="btn btn-outline-success btnWidth40">Ad player</button>
                <button class="btn btn-outline-danger btnWidth40">Remove player</button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-outline-primary btnWidth60">Transfer team</button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-outline-danger btnWidth60">DELETE team</button>
            </div>
        </div>

        <!-- <div class="d-flex flex-row justify-content-around" v-if="showPlayerActions">
            <i @click="openPlayerInputAdd" class="fas fa-plus-circle"><span>Add Player</span></i>
            <i @click="openPlayerInputRemove" class="fas fa-minus-circle"><span>Remove Player</span></i>
        </div> -->

        <!-- <div v-if="showPlayerInputAdd">
            <div v-if="allPlayers" class="mt-3 section"> -->
        <!-- <div class="d-flex flex-row justify-content-end align-items-center" @click="hidePlayerInput">
                    <i class="far fa-times-circle"></i>
                    <span class="ml-1">Close</span>
                </div> -->
        <!-- <label for="playerToAdd">Select player:</label> -->
        <!-- <select class="custom-select" id="playerToAdd" v-model="selectedPlayer">
                    <option v-for="player in allPlayers.allPlayers" :value="player._id">
                        {{ player.firstName }} {{ player.lastName }}
                    </option>
                </select> -->
        <!-- <button class="btn btn-outline-success mt-3" @click.prevent="addToTeam">
                    Go
                </button> -->
        <!-- <span v-if="message">{{ message }} <i @click="hideMessage" class="far fa-times-circle"></i></span>
                <span v-else-if="backendErrorMessage">{{ backendErrorMessage }}
                    <i @click="deleteBackendMessage" class="far fa-times-circle"></i></span> -->
        <!-- </div>
        </div> -->

        <!-- <div v-if="showPlayerInputRemove && team" class="section">
            <div class="d-flex flex-row justify-content-end align-items-center" @click="hidePlayerInput">
                <i class="far fa-times-circle"></i>
                <span class="ml-1">Close</span>
            </div> -->
        <!-- <label for="playerToRemove">Select player:</label> -->
        <!-- <select class="custom-select" id="playerToRemove" v-model="selectedPlayerToRemove">
                <option v-for="player in team.players" :value="player._id">
                    {{ player.firstName }} {{ player.lastName }}
                </option>
            </select> -->
        <!-- <button class="btn btn-outline-success mt-3" @click.prevent="removeFromTeam">
                Go
            </button> -->
        <!-- <span v-if="message">{{ message }} <i @click="hideMessage" class="far fa-times-circle"></i></span> -->
        <!-- </div> -->
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import { mapGetters } from "vuex";
import services from "../../services/event-service";
  
export default {
    props: [ 'dayId', 'divisionId', 'teamId'],
    data() {
        return {
            teamDivision: null,
            team: null
    //   message: null,
    //   selectedPlayer: null,
    //   showPlayerActions: true,
    //   showPlayerInputAdd: false,
    //   showPlayerInputRemove: false,
    //   selectedPlayerToRemove: null
        };
    },
    methods: {
        setTeamDivision(){
            this.teamDivision = this.getDivisionById(this.divisionId)
        },
        fetchTeam(){
            services.getTeam({ dayId:this.dayId, divisionId: this.divisionId, teamId: this.teamId })
                .then(res => {
                    this.team = res.data.team
                })
                .catch(err => console.log(err))
        }
//     openPlayerInputAdd() {
//       this.showPlayerActions = false;
//       this.showPlayerInputAdd = true;
//     },
//     hidePlayerInput() {
//       this.showPlayerActions = true;
//       this.showPlayerInputAdd = false;
//       this.showPlayerInputRemove = false;
//     },
//     addToTeam() {
//       if (!this.selectedPlayer) {
//         this.message = "Please select a player to add";
//       } else {
//         this.$store.dispatch("addTeamPlayer", {
//           dayId: this.$route.params.dayId,
//           divisionId: this.$route.params.divisionId,
//           teamId: this.$route.params.teamId,
//           playerId: this.selectedPlayer
//         });
//       }
//     },
//     hideMessage() {
//       this.message = null;
//     },
//     deleteBackendMessage() {
//       this.$store.dispatch("deleteBackendErrorMessage");
//     },
//     openPlayerInputRemove() {
//       this.showPlayerActions = false;
//       this.showPlayerInputRemove = true;
//     },
//     removeFromTeam() {
//       if (!this.selectedPlayerToRemove) {
//         this.message = "Please select a player to remove";
//       } else {
//         this.$store
//           .dispatch("removeTeamPlayer", {
//             dayId: this.$route.params.dayId,
//             divisionId: this.$route.params.divisionId,
//             teamId: this.$route.params.teamId,
//             playerId: this.selectedPlayerToRemove
//           })
//           .then(res => {
//             this.selectedPlayerToRemove = null;
//           });
//       }
//     }
  },
  created() {
        this.setTeamDivision(),
        this.fetchTeam()
    // this.$store.dispatch("fetchTeam", {
    //   dayId: this.$route.params.dayId,
    //   divisionId: this.$route.params.divisionId,
    //   teamId: this.$route.params.teamId
    // });
    // this.$store.dispatch("fetchDivision", {
    //   dayId: this.$route.params.dayId,
    //   divisionId: this.$route.params.divisionId
    // });
    // this.$store.dispatch("fetchAllPlayers");
  },
    computed: {
        ...mapGetters(['getDivisionById'])	
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

.btnWidth40{
    width:40%;
}
.btnWidth60{
    width: 60%;
}
</style>
