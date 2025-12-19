<script setup>
/**
 * JAR VIEW - THE VESSEL OF LIGHT
 * A poetic visualization where each gratitude entry is transformed into 
 * a floating spark inside a glass sanctuary.
 */
import { useGratitudeStore } from '../stores/gratitudeStore'
const store = useGratitudeStore()
</script>

<template>
  <div class="jar-page fade-in">
    <div class="container">
      <header class="jar-header">
        <h2 class="serif">The Vessel of Light</h2>
        <p class="subtitle">Every spark is a moment of grace you've captured.</p>
      </header>

      <div class="vessel-wrapper">
        <div class="glass-jar">
          <div class="jar-mouth"></div>
          <div class="jar-shoulder"></div>
          
          <div class="stars-area">
            <div 
              v-for="n in store.totalMoments" 
              :key="n" 
              class="glow-spark"
              :style="{ 
                left: Math.random() * 80 + 10 + '%', 
                bottom: Math.random() * 85 + 5 + '%',
                animationDuration: (Math.random() * 3 + 2) + 's',
                animationDelay: (Math.random() * 5) + 's'
              }"
            ></div>
          </div>

          <div class="jar-reflection-main"></div>
          <div class="jar-reflection-side"></div>
        </div>

        <div class="jar-base-shadow"></div>
      </div>

      <div class="jar-stats">
        <h3 class="count-display">{{ store.totalMoments }}</h3>
        <p class="label">Sparks Collected</p>
        
        <p class="goal-text" v-if="store.totalMoments < 30">
          Only {{ 30 - store.totalMoments }} more to fill your monthly sanctuary.
        </p>
        <p class="goal-text completed" v-else>
          Your jar is overflowing with light! ✨
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- LAYOUT --- */
.jar-page { min-height: 90vh; display: flex; align-items: center; padding-top: 2rem; }
.jar-header { text-align: center; margin-bottom: 3rem; }

.vessel-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
}

/* --- PREMIUM GLASS JAR DESIGN --- */
.glass-jar {
  width: 220px; height: 320px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 60px 60px 40px 40px;
  position: relative;
  box-shadow: 
    inset 0 0 30px rgba(255, 255, 255, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  overflow: hidden;
}

.jar-mouth {
  width: 140px; height: 25px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  position: absolute; top: -12px; left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

/* --- GLOWING SPARKS ANIMATION --- */
.stars-area { position: absolute; inset: 0; }
.glow-spark {
  position: absolute;
  width: 5px; height: 5px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, 0 0 20px var(--accent), 0 0 30px var(--accent);
  animation: float-spark infinite ease-in-out;
}

@keyframes float-spark {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-15px) scale(1.3); opacity: 1; }
}

/* --- VISUAL POLISH --- */
.jar-reflection-main {
  position: absolute; left: 15%; top: 10%;
  width: 8px; height: 70%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.jar-base-shadow {
  width: 180px; height: 20px;
  background: rgba(0, 0, 0, 0.6);
  filter: blur(15px);
  margin-top: -10px;
  border-radius: 50%;
}

/* --- STATS DISPLAY --- */
.jar-stats { text-align: center; margin-top: 2rem; }
.count-display { 
  font-size: 4rem; 
  font-family: 'Cormorant Garamond', serif; 
  color: var(--accent); 
  text-shadow: 0 0 20px rgba(var(--accent-rgb), 0.3);
}
.label { text-transform: uppercase; letter-spacing: 2px; font-size: 0.7rem; color: var(--text-muted); }
.goal-text { font-style: italic; color: var(--text-muted); margin-top: 1rem; }
.completed { color: #d4af37; font-weight: bold; }
</style>