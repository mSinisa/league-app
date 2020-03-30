<template>
    <div class="hello">
        <form>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" name="firstName" v-model="firstName" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" name="lastName" v-model="lastName" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone # (optional)</label>
                <input type="number" class="form-control" name="phoneNumber" v-model="phoneNumber" />
            </div>

            <label for="teamSelect">Primary club:</label>
            <div class="input-group mb-3">
                <select class="custom-select" id="teamSelect" v-model="primaryClub" required="true">
                    <option v-for="(club, index) in clubs" :value="club">
                        {{ club }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="lastName">Email</label>
                <input type="email" class="form-control" name="email" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" v-model="password" />
            </div>
            <div class="form-group">
                <button @click.prevent="register" class="btn btn-danger btn-large">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            primaryClub: null,
            email: null,
            password: null,
            phoneNumber: null,
            firstName: null,
            lastName: null,
            teamName: null,
            clubs: [
                "Indian Trail",
                "Fort Lee",
                "Haworth",
                "Upper Ridgewood",
                "Brookside",
                "Nyack",
                "Englewood",
                "Washington Township",
                "Waldwick",
                "Alpine",
                "Maywood",
                "Fairlawn",
                "Hackensack",
                "Tenafly",
                "Knickerbocker"
            ]
        }
    },
    methods: {
        register() {
            if(this.email && this.password && this.firstName && this.lastName && this.primaryClub){
                this.$store.dispatch("register", {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    primaryClub: this.primaryClub,
                    phoneNumber: this.phoneNumber
                })
                .then(() => {this.$router.push({ name: 'Home' })
                })
            } else {
                //add err message
            }
        }
    }
}
</script>

<style scoped>
.hello {
  margin: 10vh 0;
}
.btn {
  width: 100%;
  margin-bottom: 15px;
}
</style>
