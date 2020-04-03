<template>
    <div>
        <h6 class="card-subtitle mb-2 text-muted">Select one:</h6>
        <select class="custom-select" @input="sendValue($event.target.value)">
            <option :value="null">Player</option>
            <option v-for="player in arrOfPlayers" :value="player._id">
                {{ player.firstName }} {{ player.lastName }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        arrOfPlayers: { type: Array, required: true }, 
        selectedOption: {type: String || null}        
    },
    methods: {
        sendValue(value){
            this.$emit('input', value)
        }
    },
    data(){
        return{
            value: null
        }
    }
}
</script>

<style>

</style>