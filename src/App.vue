<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')
const isNavVisible = ref(true)
let lastScrollPosition = 0

// مراقبة حركة السكرول لتحديد اتجاهه
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) return
  
  // إذا كان السكرول للأسفل، أخفِ المنيو. إذا كان للأعلى، أظهره.
  // كما يظهر المنيو دائماً إذا كنا في أعلى الصفحة (أقل من 50 بكسل)
  isNavVisible.value = currentScrollPosition < lastScrollPosition || currentScrollPosition < 50
  lastScrollPosition = currentScrollPosition
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
  isDark.value = savedTheme === 'dark'
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="aura-platform">
    <nav :class="['glass-nav', { 'nav-hidden': !isNavVisible }]">
      <div class="nav-container">
        <div class="brand">
          <span class="logo-dot"></span>
          <h1 class="nav-logo">AURA</h1>
        </div>
        
        <div class="nav-links">
          <router-link to="/" class="link">Sanctuary</router-link>
          <router-link to="/journal" class="link">Journal</router-link>
          <router-link to="/insights" class="link">Insights</router-link>
          <router-link to="/jar" class="link">The Jar</router-link>
        </div>

        <button @click="toggleTheme" class="minimal-btn" :title="isDark ? 'Light Mode' : 'Dark Mode'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </nav>

    <main class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="simple-footer">
      <p>© 2025 AURA — Cultivate Serenity</p>
    </footer>
  </div>
</template>

<style scoped>
.aura-platform {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
}

/* Navigation Styling */
.glass-nav {
  position: fixed; /* تغيير من sticky إلى fixed لثبات تام */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.2rem 0;
  /* انسيابية عالية في الحركة باستخدام cubic-bezier */
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}

/* حالة الاختفاء عند النزول */
.nav-hidden {
  transform: translateY(-100%);
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
}

.nav-logo {
  font-size: 0.9rem;
  letter-spacing: 5px;
  font-weight: 400;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.link {
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
}

.link:hover { color: var(--primary); }
.link.router-link-active { color: var(--primary); font-weight: 600; }
.link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  box-shadow: 0 0 5px var(--accent);
}

.minimal-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  transition: transform 0.3s ease;
}

/* Content Area */
.content-wrapper {
  flex: 1;
  padding-top: 5rem; /* مساحة لتعويض الـ fixed nav */
}

/* Page Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(15px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-15px); }

.simple-footer {
  text-align: center;
  padding: 3rem;
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 1px;
}

/* Responsive - تحسين جذري للموبايل */
@media (max-width: 600px) {
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .nav-links {
    gap: 1rem;
  }

  .link {
    font-size: 0.65rem;
    letter-spacing: 1px;
  }

  .nav-logo {
    letter-spacing: 3px;
    font-size: 0.8rem;
  }
}
</style>