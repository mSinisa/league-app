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
						showDivisions(); hideTeams(); showDeleteDay(); hideDeleteAndEditDivision()">
						{{ day.name }}
					</button>
				</div>
			</div>

			<div class="card-footer">
				<router-link :to="{ name: 'NewDay' }" class="btn btn-outline-success">
					Add new league
				</router-link>

				<div v-if="displayDeleteDay">
					<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#staticBackdrop">
						Delete league
					</button>
					<!-- Modal -->
					<div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog"
						aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document">

							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title text-center" id="staticBackdropLabel">Are you sure?</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>

								<div class="modal-body">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
									<button @click="deleteLeagueDay" type="button" class="btn btn-danger">Yes, I want to delete league day</button>
								</div>
							</div>

						</div>
					</div>
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
						showTeams(); showDeleteAndEditDivision()">
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
					<button @click="deleteDivision(); hideDeleteAndEditDivision(); hideTeams(); hideDivisions()" 
						class="btn btn-outline-danger m-0">
						Delete Division
					</button>
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

export default {
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
		showDivisions(){
        	this.displayDivisions = true
		},
		hideDivisions(){
			this.displayDivisions = false
		},	
		showTeams() {
        	this.displayTeams = true
		},
		hideTeams(){
			this.displayTeams = false
		},
		showDeleteAndEditDivision(){
			this.displayDeleteAndEditDivision = true
		},
		hideDeleteAndEditDivision(){
			this.displayDeleteAndEditDivision = false
		},
		showDeleteDay(){
			this.displayDeleteDay = true
		},
		hideDeleteDay(){
			this.displayDeleteDay = false
		},
		deleteLeagueDay(){
			$('#staticBackdrop').modal('hide')
			this.hideDeleteDay()
			this.hideDivisions()
			this.$store.dispatch('deleteLeagueDay', this.selectedDayId)
		},	  	  
      	deleteDivision() {
        	this.$store.dispatch('deleteDivision', {
          		dayId: this.selectedDayId,
          		divisionId: this.selectedDivisionId
			})	
		}
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