<template>
    <div class="hello">
        <form>
            <div class="form-group">
                <label for="name">Division Name:</label>
                <input type="text" class="form-control" name="name" v-model="name" />
            </div>

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
export default {
    props: ["dayId"],
    data() {
        return {
            name: null,
            message: null
        };
    },
    methods: {
        showAndHideErrorMessage(){
            this.message = 'Please add a name'
            setTimeout( () => {
                this.message = null
            }, 4000)
        },
        create() {
            if (this.name) {
                this.$store.dispatch("createDivision", {
                    dayId: this.dayId,
                    name:{ name: this.name }
                })
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
