<template>
  <div class="bg-fixed min-h-screen w-screen flex items-center justify-center bg-gray-100 text-black">
    <div class="bg-white p-8 rounded-lg w-full max-w-sm shadow-2xl shadow-black">
      <h2 class="text-2xl font-bold mb-6 text-center">Contact Book</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Log in
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-4">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import authService from '../services/authService';

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
  methods: {
    
    async login() {
      try {
        const data = await authService.login(this.username, this.password);
        
        const redirectPath = this.route.query.redirect as string || { name: 'home' };
        this.router.push(redirectPath)
      } catch (error) {
        
        this.errorMessage = 'Invalid username or password.';
      }
    }
  
  }
});
</script>

<style scoped>
  .bg-fixed {
      background-image: url('../assets/images/fondo.jpg');
      background-size: 100%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: 50% 50%  ;
    }
</style>