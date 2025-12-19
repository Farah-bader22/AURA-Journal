<script setup>
import { useGratitudeStore } from '../stores/gratitudeStore'
const store = useGratitudeStore()
</script>

<template>
  <div class="insights-view fade-in">
    <div class="container">
      <header class="insights-header">
        <h2 class="serif">Your Soul's Atmosphere</h2>
        <p class="subtitle">A visual reflection of your inner light</p>
      </header>

      <section class="mood-analytics">
        <h3 class="section-label">Emotional Balance</h3>
        
        <div v-if="store.items.length === 0" class="empty-state">
           <p class="serif-small">The sanctuary is quiet. Record your first blessing to see your aura.</p>
           <router-link to="/" class="go-btn">Start Here</router-link>
        </div>

        <div v-else class="orbs-container">
          <div 
            v-for="(mood, index) in store.moodStats" 
            :key="mood.label" 
            class="mood-orb-wrapper"
            :style="{ 
              animationDelay: `${index * 0.3}s`,
              transform: `scale(${0.85 + (mood.percentage / 180)})` 
            }"
          >
            <div class="mood-orb" :style="{ 
              background: `radial-gradient(circle at 30% 30%, #fff, ${mood.color})`,
              boxShadow: `0 0 40px ${mood.color}44, inset 0 0 15px rgba(255,255,255,0.5)`
            }">
              <span class="orb-icon">{{ mood.icon }}</span>
              <span class="orb-percent">{{ mood.percentage }}%</span>
            </div>
            <span class="orb-label">{{ mood.label }}</span>
          </div>
        </div>
      </section>

      <section class="badges-section" v-if="store.items.length > 0">
        <h3 class="section-label">Your Journey Badges</h3>
        <div class="badges-container">
          
          <div :class="['badge-item', { locked: store.totalMoments < 5 }]">
            <div class="badge-icon-box">
              <span class="badge-icon">🌱</span>
              <div class="badge-glow" v-if="store.totalMoments >= 5"></div>
            </div>
            <p class="badge-name">Seedling</p>
          </div>

          <div :class="['badge-item', { locked: store.totalMoments < 20 }]">
            <div class="badge-icon-box">
              <span class="badge-icon">🌸</span>
              <div class="badge-glow" v-if="store.totalMoments >= 20"></div>
            </div>
            <p class="badge-name">Bloomer</p>
          </div>

          <div :class="['badge-item', 'radiant-badge', { locked: store.totalMoments < 50 }]">
            <div class="badge-icon-box">
              <span class="badge-icon star-icon">✨</span>
              <div class="radiant-halo"></div>
              <div class="badge-glow" v-if="store.totalMoments >= 50"></div>
            </div>
            <p class="badge-name">Radiant</p>
          </div>

        </div>
      </section>

      <section class="stats-grid" v-if="store.items.length > 0">
        <div class="stat-main-card">
          <span class="label">Total Blessings</span>
          <h2 class="val">{{ store.totalMoments }}</h2>
          <p class="description">Moments of grace captured.</p>
        </div>

        <div class="categories-breakdown">
          <h3 class="section-label" style="text-align: left; margin-bottom: 1.5rem;">Focus Areas</h3>
          <div v-for="cat in store.stats" :key="cat.name" class="cat-progress">
            <div class="cat-info">
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-count">{{ cat.count }}</span>
            </div>
            <div class="progress-bar-container">
              <div 
                class="progress-fill" 
                :style="{ width: (store.totalMoments > 0 ? (cat.count / store.totalMoments * 100) : 0) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.insights-view { padding-bottom: 5rem; min-height: 80vh; padding-top: 1rem; }
.insights-header { text-align: center; margin-bottom: 3rem; }
.subtitle { color: var(--text-muted); font-style: italic; opacity: 0.8; font-size: 0.9rem; }

.section-label {
  font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 2.5rem; text-align: center; font-weight: 600;
}

/* Orbs Styling */
.orbs-container {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem; justify-items: center; align-items: center;
  margin-bottom: 4rem; padding: 2.5rem 1rem;
  background: rgba(255, 255, 255, 0.02); border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mood-orb-wrapper { display: flex; flex-direction: column; align-items: center; animation: float 6s ease-in-out infinite; }
.mood-orb { width: 80px; height: 80px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #1a1a1a; position: relative; border: 1px solid rgba(255,255,255,0.4); }
.orb-icon { font-size: 1.5rem; margin-bottom: 2px; }
.orb-percent { font-size: 0.75rem; font-weight: 900; }
.orb-label { margin-top: 1rem; font-size: 0.6rem; letter-spacing: 1px; text-transform: uppercase; color: var(--text); font-weight: 600; }

@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

/* Badges Styling - الفخامة هنا */
.badges-container { display: flex; justify-content: center; gap: 2rem; margin-bottom: 5rem; flex-wrap: wrap; }
.badge-item { text-align: center; position: relative; width: 100px; }

.badge-icon-box { 
  background: var(--card-bg); 
  width: 70px; height: 70px; margin: 0 auto 15px;
  border-radius: 24px; box-shadow: var(--shadow-elegant); 
  display: flex; align-items: center; justify-content: center;
  position: relative; border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.badge-icon { font-size: 2rem; z-index: 2; }

/* تأثير النجمة الخاصة */
.star-icon { filter: drop-shadow(0 0 8px var(--accent)); color: #ffd700; }

.badge-name { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--text); letter-spacing: 1px; }

/* تأثير الهالة وراء النجمة */
.radiant-halo {
  position: absolute; width: 100%; height: 100%;
  border-radius: 24px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0.1; z-index: 1; animation: rotate-halo 10s linear infinite;
}

@keyframes rotate-halo { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* التكتيك لجعله مقفولاً بشكل شيك */
.locked .badge-icon-box { filter: grayscale(1); opacity: 0.3; border: 1px dashed rgba(255,255,255,0.2); }
.locked .badge-name { opacity: 0.5; }

/* توهج الأوسمة المفتوحة */
.badge-glow {
  position: absolute; inset: -5px;
  background: var(--accent); border-radius: 28px;
  filter: blur(15px); opacity: 0.2; z-index: 0;
  animation: pulse-badge 2s infinite ease-in-out;
}

@keyframes pulse-badge { 0%, 100% { opacity: 0.1; transform: scale(0.95); } 50% { opacity: 0.3; transform: scale(1.05); } }

/* Stats Grid & Progress Bars */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.stat-main-card { background: var(--primary); color: white; padding: 2.5rem; border-radius: 35px; text-align: center; box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
.stat-main-card .val { font-size: 3.5rem; font-family: 'Cormorant Garamond', serif; margin: 0.5rem 0; }

.categories-breakdown { background: var(--card-bg); padding: 2rem; border-radius: 35px; box-shadow: var(--shadow-elegant); }
.cat-progress { margin-bottom: 1.5rem; }
.cat-info { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.6rem; color: var(--text); }

.progress-bar-container { height: 8px; background: rgba(255, 255, 255, 0.06); border-radius: 10px; overflow: hidden; position: relative; }
.progress-fill { height: 100%; background: var(--accent); box-shadow: 0 0 10px var(--accent); transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 10px; }

/* Responsive Media Queries */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .orbs-container { grid-template-columns: repeat(2, 1fr); padding: 1.5rem 1rem; }
  .badges-container { gap: 1rem; }
  .badge-item { width: 85px; }
  .badge-icon-box { width: 60px; height: 60px; border-radius: 18px; }
  .badge-icon { font-size: 1.6rem; }
}

@media (max-width: 400px) {
  .orbs-container { grid-template-columns: repeat(2, 1fr); }
  .mood-orb { width: 70px; height: 70px; }
}
</style>