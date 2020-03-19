import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import About from '../views/About'
import Register from '../views/Register'
import AdminHome from '../views/AdminHome'
import NewDay from '../views/day/New'
import NewDivision from '../views/division/New'
import EditDivision from '../views/division/Edit'
import NewTeam from '../views/team/New'
import ShowTeam from '../views/team/Show'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/days/new',
    name: 'NewDay',
    component: NewDay
  },
  {
    path: '/admin/days/:dayId/divisions/new',
    name: 'NewDivision',
    component: NewDivision,
    props: true
  },
  {
    path: '/admin/days/:dayId/divisions/:divisionId/edit',
    name: 'EditDivision',
    component: EditDivision,
    props: true
  },
  {
    path: '/admin/days/:dayId/divisions/:divisionId/teams/new',
    name: 'NewTeam',
    component: NewTeam
  },
  {
    path: '/admin/days/:dayId/divisions/:divisionId/teams/:teamId',
    name: 'ShowTeam',
    component: ShowTeam
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router