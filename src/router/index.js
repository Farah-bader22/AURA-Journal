/**
 * AURA JOURNAL - ROUTER CONFIGURATION
 * This file handles all the navigation routes for the application.
 * Updated to support GitHub Pages sub-directory hosting.
 */

 import { createRouter, createWebHistory } from 'vue-router'

 // --- VIEW COMPONENTS IMPORT ---
 // We import the main views that will be rendered for each route
 import HomeView from '../views/HomeView.vue'
 import JournalView from '../views/JournalView.vue'
 import InsightsView from '../views/InsightsView.vue'
 import JarView from '../views/JarView.vue' 
 
 // --- ROUTES DEFINITION ---
 // Each route is mapped to a specific component
 const routes = [
   { 
     path: '/', 
     name: 'Home', 
     component: HomeView 
   },
   { 
     path: '/journal', 
     name: 'Journal', 
     component: JournalView 
   },
   { 
     path: '/insights', 
     name: 'Insights', 
     component: InsightsView 
   },
   { 
     path: '/jar', 
     name: 'Jar', 
     component: JarView 
   }
 ]
 
 // --- ROUTER INSTANCE ---
 // Create the router using Web History mode
 // Added 'import.meta.env.BASE_URL' to ensure the app works correctly 
 // when hosted on GitHub Pages sub-directories like /AURA-Journal/
 const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes
 })
 
 export default router