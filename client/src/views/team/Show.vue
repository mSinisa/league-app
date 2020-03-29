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
            <p v-else class="text-secondary my-4 h5">There are no players in this team</p>
        </div>

        <div class="actions mt-5" v-if="teamActions">
            <div class="addAndRemove d-flex justify-content-around">
                <button class="btn btn-outline-success btnWidth40" 
                    @click.prevent="openAddPlayerAction(); hideTeamActions()">
                    Ad player
                </button>
                <button class="btn btn-outline-danger btnWidth40"
                @click.prevent="openRemovePlayerAction(); hideTeamActions()">Remove player</button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-outline-primary btnWidth60">Transfer team</button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-outline-danger btnWidth60" @click.prevent="deleteTeam()">DELETE team</button>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mt-4">

            <div class="card" style="width: 20rem;" v-if="displayAddPlayerBox">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h5 class="card-title m-0">Add Player</h5>
                        <i class="fas fa-times" @click.prevent="hideAddPlayerAction(); showTeamActions()"></i>
                    </div>
                    <hr>

                    <div v-if="allPlayers">
                        <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
                        <select class="custom-select" id="playerToAdd" v-model="playerToAdd">
                            <option v-for="player in allPlayers" :value="player._id">
                                {{ player.firstName }} {{ player.lastName }}
                            </option>
                        </select>
                    </div>
                    <button class="btn btn-outline-success btn-small mt-3" @click.prevent="addPlayer()">Add</button>
                    <div v-if="message" class="mt-3">
                        <p class="text-danger h6">{{ message }}</p>
                    </div>
                </div>
            </div>

            <div class="card" style="width: 20rem;" v-if="displayRemovePlayerBox">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h5 class="card-title m-0">Remove Player</h5>
                        <i class="fas fa-times" @click.prevent="hideRemovePlayerAction(); showTeamActions()"></i>
                    </div>
                    <hr>

                    <div v-if="team">
                        <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
                        <select class="custom-select" v-model="playerToRemove">
                            <option v-for="player in team.players" :value="player._id">
                                {{ player.firstName }} {{ player.lastName }}
                            </option>
                        </select>
                    </div>
                    <button class="btn btn-outline-danger btn-small mt-3" @click.prevent="removePlayer()">Remove</button>
                    <div v-if="message" class="mt-3">
                        <p class="text-danger h6">{{ message }}</p>
                    </div>
                </div>
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
import { mapGetters, mapState } from "vuex"
import services from "../../services/event-service"
  
export default {
    props: [ 'dayId', 'divisionId', 'teamId'],
    data() {
        return {
            teamDivision: null,
            team: null,

            playerToAdd: null,
            playerToRemove: null,

            message: null,

            displayAddPlayerBox: false,
            displayRemovePlayerBox: false,
            teamActions: true
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
        },
        deleteTeam(){
            services.deleteTeam({ dayId:this.dayId, divisionId: this.divisionId, teamId: this.teamId })
                .then(res => {
                    this.$router.push({ name: 'AdminHome' })
                    this.$store.dispatch('notification/add', res.data.notification, {root:true})
                })
                .catch(err => console.log(err))
        },
        openAddPlayerAction(){
            this.$store.dispatch('getAllPlayers')
            this.displayAddPlayerBox = true
        },
        hideAddPlayerAction(){
            this.displayAddPlayerBox = false
        },
        addPlayer(){
            if(this.playerToAdd) {
                console.log(this.playerToAdd)
                services.addPlayer({ dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.playerToAdd })
                    .then(res => {
                        this.team = res.data.updatedTeam,
                        this.$store.dispatch("notification/add", res.data.notification , { root: true })
                        this.hideAddPlayerAction()
                        this.showTeamActions()
                    })
                    .catch(err => {
                        if(err.response.status == 409) {
                            this.$store.dispatch("notification/add", err.response.data.notification , { root: true })
                        }
                    })
            } else {
                this.showAndHideErrorMessage()
            }
        },
        openRemovePlayerAction(){
            this.displayRemovePlayerBox = true
        },
        hideRemovePlayerAction(){
            this.displayRemovePlayerBox = false
        },
        removePlayer(){
            if(this.playerToRemove){
                services.removePlayer({ dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.playerToRemove })
                    .then(res => {
                        this.team = res.data.updatedTeam,
                        this.$store.dispatch("notification/add", res.data.notification , { root: true })
                        this.hideRemovePlayerAction()
                        this.showTeamActions()                        
                    })
                    .catch(err => console.log(err))
            } else {
                this.showAndHideErrorMessage()
            }
        },
        showAndHideErrorMessage(){
            this.message = 'Please make a selection'
            setTimeout( () => {
                this.message = null
            }, 4000)
        },
        hideTeamActions(){
            this.teamActions = false
        },
        showTeamActions(){
            this.teamActions = true
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
        ...mapGetters(['getDivisionById']),
        ...mapState(['allPlayers'])
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
