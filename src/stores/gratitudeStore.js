/**
 * AURA GRATITUDE STORE
 * Managed by Pinia - Handles user data, gratitude entries, and statistics.
 */

 import { defineStore } from 'pinia'

 export const useGratitudeStore = defineStore('gratitude', {
   // --- STATE: The Data Source ---
   state: () => ({
     // Retrieves user name from local storage or defaults to empty (to show welcome screen)
     userName: localStorage.getItem('aura_user_name') || '',
     
     // Core data array for journal entries
     items: JSON.parse(localStorage.getItem('aura_data_v2')) || [],
     
     // Pre-defined categories for journaling
     categories: ['Mindfulness', 'Relationships', 'Small Wins', 'Career', 'Nature'],
     
     // Mood configuration with aesthetic icons and colors
     moods: [
       { label: 'Blessed', icon: '✨', color: '#d4af37' },
       { label: 'Calm', icon: '🌿', color: '#4a5d4e' },
       { label: 'Joyful', icon: '☀️', color: '#e6c27a' },
       { label: 'Loved', icon: '🤍', color: '#ffb7b2' }
     ],
     
     // Inspirational quotes pool for the home screen
     quotesPool: [
       "Gratitude turns what we have into enough.",
       "Joy is the simplest form of gratitude.",
       "The more grateful I am, the more beauty I see.",
       "A grateful heart is a magnet for miracles.",
       "Gratitude is the soul's masterpiece."
     ],
     currentQuote: ""
   }),
 
   // --- GETTERS: Computed Data ---
   getters: {
     /**
      * Smart Greeting: Generates a personalized message based on the time of day.
      */
     userGreeting: (state) => {
       const name = state.userName || 'Soul';
       const hour = new Date().getHours()
       
       if (hour < 12) return `Good Morning, ${name}. What’s blooming today?`
       if (hour < 18) return `Good Afternoon, ${name}. Take a breath of gratitude.`
       return `Good Evening, ${name}. Reflect on your light tonight.`
     },
 
     // Calculates entry count per category for analytics
     stats: (state) => {
       return state.categories.map(cat => ({
         name: cat,
         count: state.items.filter(i => i.category === cat).length
       }))
     },
 
     // Processes mood distribution percentages for the insights view
     moodStats: (state) => {
       const total = state.items.length
       if (total === 0) return []
       return state.moods.map(m => {
         const count = state.items.filter(i => i.mood === m.icon).length
         return {
           ...m,
           count,
           percentage: Math.round((count / total) * 100)
         }
       })
     },
     
     totalMoments: (state) => state.items.length
   },
 
   // --- ACTIONS: Business Logic ---
   actions: {
     /**
      * Updates and persists the user's name in LocalStorage.
      */
     setUserName(name) {
       this.userName = name
       localStorage.setItem('aura_user_name', name)
     },
 
     // Selects a random quote from the pool
     getRandomQuote() {
       const randomIndex = Math.floor(Math.random() * this.quotesPool.length)
       this.currentQuote = this.quotesPool[randomIndex]
     },
 
     /**
      * Adds a new gratitude entry and saves it locally.
      */
     add(content, category, moodIcon) {
       const newEntry = {
         id: Date.now(),
         text: content,
         category: category || 'Mindfulness',
         mood: moodIcon || '✨',
         date: new Date().toLocaleDateString('en-US', { 
           month: 'long', 
           day: 'numeric', 
           year: 'numeric' 
         })
       }
       this.items.unshift(newEntry)
       localStorage.setItem('aura_data_v2', JSON.stringify(this.items))
     },
 
     /**
      * Removes an entry by ID and updates LocalStorage.
      */
     deleteItem(id) {
       this.items = this.items.filter(i => i.id !== id)
       localStorage.setItem('aura_data_v2', JSON.stringify(this.items))
     }
   }
 })