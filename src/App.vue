<script setup>
/**
 * AURA MAIN ENTRY COMPONENT - FULLY RESPONSIVE
 * Manages Global Layout, Navigation, and Theme Switching.
 */
import { ref, onMounted } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
  isDark.value = savedTheme === 'dark'
})
</script>

<template>
  <div class="aura-app-container">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="brand-identity">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 257" class="aura-logo-svg">
            <defs>
              <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#41D1FF" />
                <stop offset="100%" stop-color="#BD34FE" />
              </linearGradient>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFEA83" />
                <stop offset="100%" stop-color="#FFA800" />
              </linearGradient>
            </defs>
            <path fill="url(#blue-grad)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path>
            <path fill="url(#gold-grad)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path>
          </svg>
          <span class="brand-name">AURA</span>
        </div>

        <div class="nav-links">
          <router-link to="/" class="nav-item">Sanctuary</router-link>
          <router-link to="/journal" class="nav-item">Journal</router-link>
          <router-link to="/insights" class="nav-item">Insights</router-link>
          <router-link to="/jar" class="nav-item">The Jar</router-link>
        </div>

        <button @click="toggleTheme" class="theme-btn">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </nav>

    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      <div class="footer-inner">
        <p class="copyright-text">© 2025 AURA Sanctuary. All rights reserved.</p>
        <p class="credit-text">Designed with Grace by Farah Bader</p>
        <div class="footer-visual">
          <span class="orb-dot"></span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* --- BASE LAYOUT --- */
.aura-app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg);
  overflow-x: hidden; /* Prevents unwanted horizontal scroll on mobile */
}

/* --- RESPONSIVE NAVBAR --- */
.main-nav {
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(var(--bg-rgb), 0.85);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.brand-identity { display: flex; align-items: center; gap: 10px; }
.aura-logo-svg { width: 28px; height: 28px; }
.brand-name { 
  font-family: 'Cormorant Garamond', serif; 
  letter-spacing: 3px; 
  font-weight: 700; 
  font-size: 1.1rem;
}

.nav-links { display: flex; gap: 1.8rem; }
.nav-item { 
  text-decoration: none; 
  color: var(--text-muted); 
  font-size: 0.7rem; 
  text-transform: uppercase; 
  letter-spacing: 1px;
  transition: color 0.3s ease;
}
.router-link-active { color: var(--accent); font-weight: bold; }

.theme-btn { 
  background: none; 
  border: none; 
  cursor: pointer; 
  font-size: 1rem;
  padding: 5px;
}

/* --- MAIN CONTENT --- */
.app-main { 
  flex: 1; 
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* --- FOOTER --- */
.app-footer { padding: 3rem 1.5rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.03); }
.copyright-text { font-size: 0.65rem; color: var(--text-muted); opacity: 0.7; }
.credit-text { 
  font-size: 0.6rem; 
  color: var(--accent); 
  margin-top: 8px; 
  text-transform: uppercase; 
  letter-spacing: 2px; 
}
.orb-dot { 
  display: inline-block; width: 4px; height: 4px; 
  background: var(--accent); border-radius: 50%; margin-top: 12px; 
  box-shadow: 0 0 10px var(--accent);
}

/* --- TRANSITIONS --- */
.page-fade-enter-active, .page-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.page-fade-enter-from { opacity: 0; transform: translateY(5px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-5px); }

/* --- MEDIA QUERIES FOR MOBILE DEVICES --- */
@media (max-width: 768px) {
  .nav-content {
    flex-direction: row; /* Keep logo and theme button on ends */
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .nav-links {
    order: 3; /* Move links to second row on mobile */
    width: 100%;
    justify-content: center;
    margin-top: 1.2rem;
    gap: 1.2rem;
  }

  .nav-item {
    font-size: 0.6rem;
    letter-spacing: 0.5px;
  }

  .brand-name {
    font-size: 1rem;
    letter-spacing: 2px;
  }

  .app-footer {
    padding: 2.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 0.8rem;
  }
  .nav-item {
    font-size: 0.55rem;
  }
}
</style>