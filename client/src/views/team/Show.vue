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
            <div class="d-flex justify-content-around">
                <button class="btn btn-outline-success btnWidth40" 
                    @click.prevent="getAllPlayers(); showElements('displayAddPlayerBox'); hideElements('teamActions')">
                    Ad player
                </button>
                <button class="btn btn-outline-danger btnWidth40"
                    @click.prevent="showElements('displayRemovePlayerBox'); hideElements('teamActions')">
                    Remove player
                </button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-outline-primary btnWidth60"
                    @click.prevent="setDivisionsToTransferTo(); showElements('displayTransferTeamBox'); hideElements('teamActions')">
                    Transfer team
                </button>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <ConfirmModal modId="hardCoded" textRef="Team" action="Delete" @notify='deleteTeam()' class="btnWidth60"/>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mt-4">

            <div class="card" style="width: 20rem;" v-if="displayAddPlayerBox">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h5 class="card-title m-0">Add Player</h5>
                        <i class="fas fa-times" @click.prevent="hideElements('displayAddPlayerBox'); showElements('teamActions')"></i>
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
                        <i class="fas fa-times" @click.prevent="hideElements('displayRemovePlayerBox'); showElements('teamActions')"></i>
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

            <div class="card" style="width: 20rem;" v-if="displayTransferTeamBox">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <h5 class="card-title m-0">Transfer team</h5>
                        <i class="fas fa-times" @click.prevent="hideElements('displayTransferTeamBox'); showElements('teamActions')"></i>
                    </div>
                    <hr>

                    <div v-if="divisionsToTransferTo">
                        <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
                        <select class="custom-select" v-model="divisionToTransferTo">
                            <option v-for="division in divisionsToTransferTo" :value="division._id">
                                {{ division.name }}
                            </option>
                        </select>
                    </div>

                    <button class="btn btn-outline-success btn-small mt-3" @click.prevent="transferTeam()">Transfer</button>
                    <div v-if="message" class="mt-3">
                        <p class="text-danger h6">{{ message }}</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { showElements, hideElements, returnRandomId }  from '../../utils/commonMethods'
import services from "../../services/event-service"
import ConfirmModal from '../../components/ConfirmModal'

export default {
    props: [ 'dayId', 'divisionId', 'teamId'],
    components:{
        ConfirmModal
    },
    data() {
        return {
            divisionsToTransferTo: null,
            divisionToTransferTo: null,

            teamDivision: null,
            team: null,

            playerToAdd: null,
            playerToRemove: null,

            message: null,

            displayAddPlayerBox: false,
            displayRemovePlayerBox: false,
            displayTransferTeamBox: false,
            teamActions: true,
            modalID: null
        }
    },
    methods: {
        showElements: showElements,
        hideElements: hideElements,
        returnRandomId: returnRandomId,
        showAndHideErrorMessage(){
            this.message = 'Please make a selection'
            setTimeout( () => {
                this.message = null
            }, 4000)
        },
        setDivisionsToTransferTo(){
            let leagueDay = this.getDayById(this.dayId)
            this.divisionsToTransferTo = leagueDay.divisions.filter(division => division._id !== this.divisionId)
        },
        setTeamDivision(){
            this.teamDivision = this.getDivisionById(this.divisionId)
        },
        getAllPlayers(){
            this.$store.dispatch('getAllPlayers')
        },
        fetchTeam(){
            services.getTeam({ dayId:this.dayId, divisionId: this.divisionId, teamId: this.teamId })
                .then(res => {
                    this.team = res.data.team
                })
                .catch(err => console.log(err))
        },
        showAndHideNotification(res){
            this.$store.dispatch('notification/add', res.data.notification)
        },
        addPlayer(){
            if(this.playerToAdd) {
                services.addPlayer({ dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.playerToAdd })
                    .then(res => {
                        this.team = res.data.updatedTeam,
                        this.showAndHideNotification(res)
                        this.hideElements('displayAddPlayerBox')
                        this.showElements('teamActions')
                    })
                    .catch(err => {
                        if(err.response.status == 409) {
                            this.$store.dispatch('notification/add', err.response.data.notification)
                        } else {
                            console.log(err)
                        }
                    })
            } else {
                this.showAndHideErrorMessage()
            }
        },
        removePlayer(){
            if(this.playerToRemove){
                services.removePlayer({ dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.playerToRemove })
                    .then(res => {
                        this.team = res.data.updatedTeam,
                        this.showAndHideNotification(res)
                        this.hideElements('displayRemovePlayerBox')
                        this.showElements('teamActions')                        
                    })
                    .catch(err => console.log(err))
            } else {
                this.showAndHideErrorMessage()
            }
        },
        transferTeam(){
            services.transferTeamBetweenDivisions({dayId: this.dayId, teamId: this.teamId, currentDivisionId: this.divisionId, divisionToTransferToId: this.divisionToTransferTo})
            .then(res => {
                this.showAndHideNotification(res)
                this.$router.push({ name:'AdminHome' })
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTeam(){
            services.deleteTeam({ dayId:this.dayId, divisionId: this.divisionId, teamId: this.teamId })
                .then(res => {
                    this.$router.push({ name: 'AdminHome' })
                    this.showAndHideNotification(res)
                })
                .catch(err => console.log(err))
        }
    },
    created() {
        this.setTeamDivision()
        this.fetchTeam()
    },
    computed: {
        ...mapGetters(['getDivisionById', 'getDayById']),
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