<template>
    <div class="hello">
        <form>
            <div class="form-group">
                <label for="name">Team Name</label>
                <input type="text" class="form-control" name="name" v-model="name" />
            </div>

            <!-- <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" name="description" v-model="description" />
            </div> -->

            <div class="form-group">
                <button class="btn btn-outline-success btn-large" @click.prevent="create">
                    Create
                </button>
            </div>

            <div v-if="message">
                <p class="text-danger">{{ message }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import services from '../../services/event-service'
import notification from '../../store/modules/notification'

export default {
    props: ["dayId", "divisionId"],
    data() {
        return {
            name: null,
            message: null,
            // description: null,
        }
    },
    methods: {
        showAndHideErrorMessage(){
            this.message = 'Please add a name'
            setTimeout( () => {
                this.message = null
            }, 4000)
        },
        create() {
            if(this.name){
                services.createTeam({name: this.name}, this.dayId, this.divisionId)
                    .then(res => {
                        this.$router.push({ name: "AdminHome" });
                        this.$store.dispatch("notification/add", res.data.notification , { root: true });
                    })
                    .catch(err => console.log(err))
            } else {
                this.showAndHideErrorMessage()
            }
        }
    }
};
</script>

<style scoped>
form{
    width: 80%;
    margin: 0 auto;
}
.hello {
  margin: 10vh 0;
}
.btn {
  width: 100%;
  margin-bottom: 15px;
}
</style>
