<template>
    <div class="card" style="width: 20rem;">
        <div class="card-body">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h5 class="card-title m-0">Transfer team</h5>
                <i class="fas fa-times" @click.prevent="closeCard()"></i>
            </div>
            <hr>
            <div v-if="divisionsToTransferTo">
                <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
                <select class="custom-select" v-model="divisionToTransferTo">
                    <option :value="null">Division</option>
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
</template>

<script>
import { showAndHideErrorMessage } from '../../utils/commonMethods'

export default {
    props: {
        dayId: { type:String, required:true }, 
        divisionId: { type:String, required:true }, 
        teamId: { type:String, required:true }, 
        divisionsToTransferTo:{ type: Array, required:true },
    },
    data() {
        return {
            divisionToTransferTo: null,
            message: null          
        }
    },
    methods: {
        showAndHideErrorMessage: showAndHideErrorMessage,
        closeCard(){
            this.$emit('close')
        },
        transferTeam(){
            if(this.divisionToTransferTo){
            this.$store.dispatch('transferTeamBetweenDivisions', {dayId: this.dayId, teamId: this.teamId, currentDivisionId: this.divisionId, divisionToTransferToId: this.divisionToTransferTo})
            } else {
                this.showAndHideErrorMessage()
            }
        }
    }
}
</script>

<style>

</style>