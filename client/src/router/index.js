import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '../views/About'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/Register'),
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: () => import(/* webpackChunkName: "AdminHome" */ '../views/AdminHome'),
        meta: {
            requiresAuth: true, isAdmin: true
        }
    },
    {
        path: '/admin/days/new',
        name: 'NewDay',
        component: () => import(/* webpackChunkName: "NewDay" */ '../views/day/New'),
    },
    {
        path: '/admin/days/:dayId/divisions/new',
        name: 'NewDivision',
        component: () => import(/* webpackChunkName: "NewDivision" */ '../views/division/New'),
        props: true
    },
    {
        path: '/admin/days/:dayId/divisions/:divisionId/teams/new',
        name: 'NewTeam',
        component: () => import(/* webpackChunkName: "NewTeam" */ '../views/team/New'),
        props: true
    },
    {
        path: '/admin/days/:dayId/divisions/:divisionId/teams/:teamId',
        name: 'ShowTeam',
        component: () => import(/* webpackChunkName: "About" */ '../views/team/Show'),
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = JSON.parse(localStorage.getItem('user'))
    const requiresAuth = (to.matched.some(record => record.meta.requiresAuth))
    const requiresAdmin = (to.matched.some(record => record.meta.isAdmin))
 
    if(requiresAuth && !loggedIn){
        console.log('not logged in')
        next({name: 'Login'})
    } else if(requiresAuth && !requiresAdmin && loggedIn) {
        console.log('doesnt require admin')
        next()
    } else if(requiresAuth && requiresAdmin && loggedIn){
        if(loggedIn.isAdmin) {
            console.log('aparently is admin')
            next()
        } else {
            console.log('not ad admin cant go')
            next('/')
        }
    }
    else {
        console.log('everyone goes')
        next()
    }
})

export default router