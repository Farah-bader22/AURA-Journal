/**
 * AURA - GRATITUDE SANCTUARY
 * Main Entry Point
 * * This file initializes the Vue 3 application, 
 * attaches the Pinia store for state management,
 * and configures the router for seamless navigation.
 */

 import { createApp } from 'vue'
 import { createPinia } from 'pinia'
 import App from './App.vue'
 import router from './router'
 
 // Global styling - Ensure this includes your CSS variables
 import './style.css'
 
 // 1. Initialize the Vue application instance
 const app = createApp(App)
 
 // 2. Integration of Pinia (State Management)
 // Used for persisting user data and gratitude entries
 app.use(createPinia())
 
 // 3. Integration of Vue Router (Navigation)
 // Handles switching between Home, Journal, and Insights
 app.use(router)
 
 // 4. Mount the application to the DOM
 app.mount('#app')