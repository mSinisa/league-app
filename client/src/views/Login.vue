<template>
    <div class="hello">
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" name="email" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" v-model="password" />
            </div>
            <div class="text-center">
                <button @click.prevent="login" class="btn btn-primary btn-large">
                    Login
                </button>
            </div>
        </form>
        <div class="text-center">
            Don't have an account yet?
            <router-link :to="{ name: 'Register' }">
                Register
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            if(this.email && this.password) {
                this.$store.dispatch("login", { email: this.email, password: this.password })
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
