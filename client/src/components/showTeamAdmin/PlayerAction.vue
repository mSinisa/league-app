<template>
    <div class="card" style="width: 20rem;">
        <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h5 class="card-title m-0">{{ action }} Player</h5>
                <i class="fas fa-times" @click.prevent="closeCard()"></i>
            </div>
            <hr>
            <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
            <div v-if="arrOfPlayers">
                <PlayerSelect v-model="selectedPlayer" :arrOfPlayers="arrOfPlayers" />
            </div>

            <button class="btn btn-outline-success btn-small mt-3" @click.prevent="callAction()">{{ action }}</button>
            <div v-if="message" class="mt-3">
                <p class="text-danger h6">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { showAndHideErrorMessage } from '../../utils/commonMethods'
import PlayerSelect from '../PlayerSelect'

export default {
    components: {
        PlayerSelect
    },
    props: {
        dayId: { type:String, required:true }, 
        divisionId: { type:String, required:true }, 
        teamId: { type:String, required:true }, 
        arrOfPlayers:{ type: Array, required:true },
        action: { type: String, required:true }
    },
    data() {
        return {
            selectedPlayer: null,
            message: null,
            value: null
        }
    },
    methods: {
        showAndHideErrorMessage: showAndHideErrorMessage,
        closeCard(){
            this.$emit('close')
        },
        callAction(){
            if(this.action === 'Add'){
                this.addPlayer()
            } else if (this.action === 'Remove') {
                this.removePlayer()
            }
        },
        addPlayer(){
            if(this.selectedPlayer) {
                this.$store.dispatch('addTeamPlayer', { dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.selectedPlayer })
                this.closeCard()
            } else {
                this.showAndHideErrorMessage()
            }
        },
        removePlayer(){
            if(this.selectedPlayer){
                this.$store.dispatch('removeTeamPlayer', { dayId: this.dayId, divisionId: this.divisionId, teamId: this.teamId, playerId: this.selectedPlayer })
                this.closeCard() 
            } else {
                this.showAndHideErrorMessage()
            }
        }
    }
}
</script>

<style>

</style>