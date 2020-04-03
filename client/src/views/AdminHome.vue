<template>
	<div class="hello text-center">
		<div class="card border-secondary mb-3" style="max-width: 18rem;">
			<div class="card-header">
				Leagues
			</div>

			<div class="card-body text-secondary">
				<div class="d-flex flex-row flex-wrap" v-if="days">
					<button v-for="(day, index) in days" :key="day._id" class="btn btn-outline-dark mx-2"
						@click.prevent="saveIdOfSelectedDay(day._id); setDayDivisions(day._id); 
						showElements('displayDivisions','displayDeleteDay'); hideElements('displayTeams','displayDeleteAndEditDivision')">
						{{ day.name }}
					</button>
				</div>
			</div>

			<div class="card-footer">
				<router-link :to="{ name: 'NewDay' }" class="btn btn-outline-success">
					Add new league
				</router-link>

				<div v-if="displayDeleteDay">
					<ConfirmModal modId="hardCoded1" textRef="League" action="Delete" @notify='deleteLeagueDay()'/>
				</div>
			</div>
		</div>
		
		<div class="card border-secondary mb-3" style="max-width: 18rem;" v-if="displayDivisions">
			<div class="card-header">
				Divisions
			</div>

			<div class="card-body text-secondary">
				<div class="d-flex flex-row flex-wrap" v-if="divisionsInSelectedDay.length > 0">
					<button v-for="division in divisionsInSelectedDay" :key="division._id" class="btn btn-outline-dark mx-2"
						@click.prevent="saveIdOfSelectedDivision(division._id); setDivisionTeams(division._id); 
						showElements('displayTeams','displayDeleteAndEditDivision'); hideElements('displayDeleteDay')">
						{{ division.name }}
					</button>
				</div>
				<p v-else>No divisions in this league day</p>
			</div>

			<div class="card-footer">
				<router-link :to="{ name: 'NewDivision', params: { dayId: selectedDayId } }" 
					class="btn btn-outline-success">
					Add new division
				</router-link>

				<div v-if="displayDeleteAndEditDivision">
					<ConfirmModal modId="hardCoded2" textRef="Division" action="Delete" 
					@notify="deleteDivision(); hideElements('displayDeleteAndEditDivision','displayTeams','displayDivisions')"/>
				</div>
			</div>
		</div>

		<div class="card border-secondary mb-3" style="max-width: 18rem;" v-if="displayTeams">
			<div class="card-header">
				Teams
			</div>

			<div class="card-body text-secondary">
				<div class="d-flex flex-row flex-wrap" v-if="teamsInSelectedDivision.length > 0">
					<router-link v-for="team in teamsInSelectedDivision" :key="team._id" 
						:to="{ name: 'ShowTeam', params: { dayId: selectedDayId, divisionId: selectedDivisionId, teamId: team._id }}" 
						class="btn btn-outline-dark mx-2">
						{{ team.name }}
					</router-link>
				</div>
				<p v-else>No teams in this division</p>
			</div>

			<div class="card-footer">
				<router-link :to="{ name: 'NewTeam', params: { dayId: selectedDayId, divisionId: selectedDivisionId }}" 
					class="btn btn-outline-success">
					Add new team
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import {showElements, hideElements}  from '../utils/commonMethods'
import ConfirmModal from '../components/ConfirmModal'

export default {
	components: {
		ConfirmModal
	},
    data() {
      	return {
			selectedDayId: null,
			divisionsInSelectedDay: null,
			selectedDivisionId: null,
			teamsInSelectedDivision: null,

			displayDeleteDay: false,
			displayDivisions: false,

			displayTeams: false,
			displayDeleteAndEditDivision: false,
  		};
    },
    methods: {
		saveIdOfSelectedDay(id){
			this.selectedDayId = id
	  	},
		setDayDivisions(divisionId){
			let selectedDay = this.getDayById(divisionId)
			this.divisionsInSelectedDay = selectedDay.divisions
		},
		saveIdOfSelectedDivision(id) {
			this.selectedDivisionId = id
		},
		setDivisionTeams(divisionId){
			let selectedDivision = this.getDivisionById(divisionId)
			this.teamsInSelectedDivision = selectedDivision.teams
		},
		deleteLeagueDay(){
			this.hideElements('displayDeleteDay', 'displayDivisions')
			this.$store.dispatch('deleteLeagueDay', this.selectedDayId)
		},	  	  
      	deleteDivision() {
        	this.$store.dispatch('deleteDivision', { dayId: this.selectedDayId, divisionId: this.selectedDivisionId })	
		},
		showElements: showElements,
		hideElements: hideElements
    },
    created() {
      	this.$store.dispatch('getDays')
		this.$store.dispatch('getAllDivisions')
    },
    computed: {
		...mapState(['days', 'allDivisions']),
		...mapGetters(['getDayById', 'getDivisionById'])	  	
    }
}
</script>

<style scoped>
  .hello {
    margin: 9vh 0;
  }
  .btn {
    width: 100%;
    margin-bottom: 15px;
  }
  .card {
    margin: 0 auto;
  }
</style>