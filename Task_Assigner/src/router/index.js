import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AssignTask from '../views/AssignTask.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AssignTask',
    component: AssignTask
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
