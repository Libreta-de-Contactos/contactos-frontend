import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Home from '../views/HomeView.vue'
import authService from '../services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authService.isAuthenticated();
        if (isAuthenticated) {
          next({
            path: '/home',
            
          });
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: async (to, from, next) => {
      const isAuthenticated = await authService.isAuthenticated();
      if (!isAuthenticated) {
        next({
          path: '/',
          
        });
      } else {
        next();
      }
    }
    }
  ]
  
})

export default router
