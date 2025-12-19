/**
 * AURA JOURNAL - ROUTER CONFIGURATION
 * This file handles all the navigation routes for the application.
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
 // Create the router using Web History mode for clean URLs
 const router = createRouter({
   history: createWebHistory(),
   routes
 })
 
 export default router