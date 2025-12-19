import { defineStore } from 'pinia'

export const useGratitudeStore = defineStore('gratitude', {
  state: () => ({
    // قراءة الاسم من الذاكرة، إذا لم يوجد يكون فارغاً (لتظهر شاشة الترحيب)
    userName: localStorage.getItem('aura_user_name') || '',
    
    items: JSON.parse(localStorage.getItem('aura_data_v2')) || [],
    categories: ['Mindfulness', 'Relationships', 'Small Wins', 'Career', 'Nature'],
    moods: [
      { label: 'Blessed', icon: '✨', color: '#d4af37' },
      { label: 'Calm', icon: '🌿', color: '#4a5d4e' },
      { label: 'Joyful', icon: '☀️', color: '#e6c27a' },
      { label: 'Loved', icon: '🤍', color: '#ffb7b2' }
    ],
    quotesPool: [
      "Gratitude turns what we have into enough.",
      "Joy is the simplest form of gratitude.",
      "The more grateful I am, the more beauty I see.",
      "A grateful heart is a magnet for miracles.",
      "Gratitude is the soul's masterpiece."
    ],
    currentQuote: ""
  }),

  getters: {
    // الترحيب الذكي: يتعرف على أي اسم مخزن ويغير الرسالة حسب الوقت
    userGreeting: (state) => {
      const name = state.userName || 'Soul'; // اسم افتراضي إذا لم يوجد اسم
      const hour = new Date().getHours()
      
      if (hour < 12) return `Good Morning, ${name}. What’s blooming today?`
      if (hour < 18) return `Good Afternoon, ${name}. Take a breath of gratitude.`
      return `Good Evening, ${name}. Reflect on your light tonight.`
    },

    stats: (state) => {
      return state.categories.map(cat => ({
        name: cat,
        count: state.items.filter(i => i.category === cat).length
      }))
    },

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

  actions: {
    // الأكشن الجديد لحفظ الاسم وتذكره للأبد
    setUserName(name) {
      this.userName = name
      localStorage.setItem('aura_user_name', name)
    },

    getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * this.quotesPool.length)
      this.currentQuote = this.quotesPool[randomIndex]
    },

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

    deleteItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      localStorage.setItem('aura_data_v2', JSON.stringify(this.items))
    }
  }
})