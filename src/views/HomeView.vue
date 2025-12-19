<script setup>
import { ref, onMounted } from 'vue'
import { useGratitudeStore } from '../stores/gratitudeStore'

const store = useGratitudeStore()
const newText = ref('')
const tempName = ref('') 
const selectedCategory = ref('Mindfulness')
const selectedMood = ref('✨')

onMounted(() => {
  store.getRandomQuote()
})

const handleNameSave = () => {
  if (tempName.value.trim()) {
    store.setUserName(tempName.value.trim())
  }
}

const saveEntry = () => {
  if (newText.value.trim()) {
    store.add(newText.value, selectedCategory.value, selectedMood.value)
    newText.value = ''
    const btn = document.querySelector('.action-btn')
    if(btn) {
      btn.textContent = 'Captured ✨'
      setTimeout(() => btn.textContent = 'Record Grace', 2000)
    }
  }
}
</script>

<template>
  <div class="home-view fade-in">
    
    <transition name="blur-fade">
      <div v-if="!store.userName" class="name-overlay">
        <div class="name-card glass">
          <span class="ornament">✦</span>
          <h2 class="serif">Welcome to AURA</h2>
          <p class="subtitle">How should we address your soul?</p>
          
          <div class="name-input-wrapper">
            <input 
              v-model="tempName" 
              type="text" 
              placeholder="Your name..." 
              @keyup.enter="handleNameSave"
            />
            <button @click="handleNameSave" class="begin-btn">Begin Journey</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="container" :class="{ 'content-blur': !store.userName }">
      
      <header class="hero-section">
        <div class="quote-display-container">
          <div class="quote-glow"></div>
          <span class="ornament">✦</span>
          <transition name="quote-fade" mode="out-in">
            <h1 :key="store.currentQuote" class="main-quote">
              "{{ store.currentQuote }}"
            </h1>
          </transition>
          <button @click="store.getRandomQuote" class="refresh-quote-btn">
            Explore New Light
          </button>
          <div class="quote-line-animated"></div>
        </div>
      </header>

      <section class="creator-card">
        <div class="creator-header">
          <div class="greeting-box">
            <h2 class="serif">{{ store.userGreeting }}</h2>
            <p class="subtitle-small">Let your heart speak through words.</p>
          </div>
          
          <div class="mood-selector-fancy">
            <span 
              v-for="m in store.moods" 
              :key="m.label"
              :class="['mood-dot', { active: selectedMood === m.icon }]"
              @click="selectedMood = m.icon"
            >
              <span class="m-icon">{{ m.icon }}</span>
              <span class="m-label">{{ m.label }}</span>
            </span>
          </div>
        </div>

        <div class="input-area">
          <textarea 
            v-model="newText" 
            placeholder="In this moment, I am thankful for..."
            class="sanctuary-input"
          ></textarea>
        </div>

        <div class="creator-footer">
          <div class="category-pill-selector">
            <span class="label-serif">Focus on:</span>
            <select v-model="selectedCategory" class="minimal-select">
              <option v-for="c in store.categories" :key="c">{{ c }}</option>
            </select>
          </div>
          <button @click="saveEntry" class="action-btn">Record Grace</button>
        </div>
      </section>

      <section class="recent-peek" v-if="store.items.length > 0">
        <h3 class="section-title">Latest Soul Reflections</h3>
        <div class="peek-grid">
          <div v-for="item in store.items.slice(0, 2)" :key="item.id" class="peek-card">
            <span class="peek-mood-tag">{{ item.mood }}</span>
            <p class="peek-text">"{{ item.text }}"</p>
            <span class="peek-date">{{ item.date }}</span>
          </div>
        </div>
        <router-link to="/journal" class="view-all-button">Enter Full Journal →</router-link>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-view { padding: 2rem 0 6rem; position: relative; min-height: 100vh; }

/* Name Overlay Styling */
.name-overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  z-index: 2000; display: flex; align-items: center; justify-content: center;
}
.name-card {
  padding: 4rem 2rem; border-radius: 40px; background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1); text-align: center;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5); max-width: 450px; width: 90%;
}
.name-input-wrapper { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
.name-card input {
  background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.1);
  padding: 10px; color: white; font-size: 1.5rem; text-align: center; transition: 0.3s;
}
.name-card input:focus { outline: none; border-bottom-color: var(--accent); }
.begin-btn {
  background: var(--accent); color: var(--bg); border: none; padding: 12px 40px;
  border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s;
}
.content-blur { filter: blur(10px); pointer-events: none; transition: filter 0.8s ease; }

/* Hero & Quote Section */
.hero-section { position: relative; padding: 4rem 0; text-align: center; }
.quote-glow { 
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 250px; height: 120px; background: var(--accent); filter: blur(100px); opacity: 0.1; z-index: -1;
}
.ornament { color: var(--accent); font-size: 1.5rem; display: block; margin-bottom: 1rem; }
.main-quote {
  font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-style: italic;
  color: var(--primary); max-width: 800px; margin: 0 auto; line-height: 1.2;
}
.refresh-quote-btn {
  background: none; border: 1px solid rgba(var(--accent-rgb), 0.3); color: var(--accent);
  padding: 8px 20px; border-radius: 30px; font-size: 0.7rem; letter-spacing: 2px;
  text-transform: uppercase; cursor: pointer; margin-top: 2rem; transition: 0.3s;
}
.quote-line-animated { 
  width: 50px; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent);
  margin: 3rem auto; 
}

/* Creator Card */
.creator-card {
  background: var(--card-bg); padding: 3rem; border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: var(--shadow-elegant);
  margin-bottom: 4rem;
}
.creator-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; }
.serif { font-size: 2rem; color: var(--primary); }
.subtitle-small { color: var(--text-muted); font-size: 0.9rem; }

.mood-selector-fancy { display: flex; gap: 1.2rem; }
.mood-dot { display: flex; flex-direction: column; align-items: center; cursor: pointer; opacity: 0.3; transition: 0.3s; }
.mood-dot.active { opacity: 1; transform: scale(1.2); }
.m-icon { font-size: 1.6rem; }
.m-label { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); font-weight: bold; }

.sanctuary-input {
  width: 100%; border: none; background: transparent; font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; min-height: 120px; outline: none; resize: none; color: var(--text);
  border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 2rem; font-style: italic;
}

.creator-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
.label-serif { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; margin-right: 10px; }
.minimal-select { border: none; background: rgba(255,255,255,0.05); padding: 8px 15px; border-radius: 10px; color: var(--accent); font-weight: 600; cursor: pointer; }
.action-btn { background: var(--primary); color: white; border: none; padding: 1.2rem 3rem; border-radius: 18px; font-weight: 700; cursor: pointer; transition: 0.3s; }

/* Recent Peek */
.recent-peek { text-align: center; margin-top: 2rem; }
.peek-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2.5rem 0; }
.peek-card { background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 25px; border: 1px solid rgba(255,255,255,0.05); text-align: left; }
.peek-text { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-style: italic; margin-bottom: 0.5rem; }
.peek-date { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; }
.view-all-button { text-decoration: none; color: var(--accent); font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid var(--accent); padding-bottom: 4px; }

/* Animations & Responsive */
.blur-fade-leave-active { transition: all 0.8s ease; }
.blur-fade-leave-to { opacity: 0; transform: scale(1.05); filter: blur(20px); }

@media (max-width: 768px) {
  .main-quote { font-size: 2rem; padding: 0 1rem; }
  .creator-card { padding: 2rem 1.5rem; }
  .peek-grid { grid-template-columns: 1fr; }
  .serif { font-size: 1.6rem; }
  .creator-header { flex-direction: column; align-items: center; text-align: center; }
  .creator-footer { justify-content: center; }
}
</style>