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
                    @click.prevent="showElements('displayAddPlayerBox'); hideElements('teamActions')">
                    Add player
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
            <div class="d-flex justify-content-center mt-4"> <!-- DELETE TEAM -->
                <ConfirmModal modId="hardCoded" textRef="Team" action="Delete" @notify='deleteTeam()' class="btnWidth60"/>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mt-4">
            <div v-if="displayAddPlayerBox">
                <PlayerAction @close="hideElements('displayAddPlayerBox'); showElements('teamActions')"
                    :dayId="dayId" :divisionId="divisionId" :teamId="teamId" :arrOfPlayers="allPlayers"
                    action="Add"/>
            </div>

            <div v-if="displayRemovePlayerBox">
                <PlayerAction @close="hideElements('displayRemovePlayerBox'); showElements('teamActions')"
                    :dayId="dayId" :divisionId="divisionId" :teamId="teamId" :arrOfPlayers="team.players"
                    action="Remove"/>
            </div>

            <div v-if="displayTransferTeamBox">
                <TransferTeam @close="hideElements('displayTransferTeamBox'); showElements('teamActions')"
                    :dayId="dayId" :divisionId="divisionId" :teamId="teamId" :divisionsToTransferTo="divisionsToTransferTo"/>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { showElements, hideElements }  from '../../utils/commonMethods'
import services from "../../services/event-service"
import ConfirmModal from '../../components/ConfirmModal'
import PlayerSelect from '../../components/PlayerSelect'
import PlayerAction from '../../components/showTeamAdmin/PlayerAction'
import TransferTeam from '../../components/showTeamAdmin/TransferTeam'

export default {
    props: [ 'dayId', 'divisionId', 'teamId'],
    components: {
        ConfirmModal,
        PlayerSelect,
        PlayerAction,
        TransferTeam
    },
    data() {
        return {
            divisionsToTransferTo: null,
            teamDivision: null,
            displayAddPlayerBox: false,
            displayRemovePlayerBox: false,
            displayTransferTeamBox: false,
            teamActions: true
        }
    },
    methods: {
        showElements: showElements,
        hideElements: hideElements,
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
            this.$store.dispatch('fetchTeam', {dayId: this.dayId, divisionId: this.divisionId, teamId:this.teamId})
        },
        showAndHideNotification(res){
            this.$store.dispatch('notification/add', res.data.notification)
        },
        deleteTeam(){
            this.$store.dispatch('deleteTeam', { dayId:this.dayId, divisionId: this.divisionId, teamId: this.teamId })
        }
    },
    created() {
        this.setTeamDivision()
        this.fetchTeam()
        this.getAllPlayers()
    },
    computed: {
        ...mapGetters(['getDivisionById', 'getDayById']),
        ...mapState(['allPlayers', 'team'])
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