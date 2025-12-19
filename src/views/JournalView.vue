<script setup>
/**
 * JOURNAL VIEW - THE CHRONICLES
 * This component displays the user's gratitude timeline with search functionality.
 */
import { ref, computed } from 'vue'
import { useGratitudeStore } from '../stores/gratitudeStore'

const store = useGratitudeStore()
const searchQuery = ref('')

// --- COMPUTED: Search Filter ---
/**
 * Dynamically filters the gratitude items based on the user's search query.
 * It's case-insensitive for a better user experience.
 */
const filteredItems = computed(() => {
  return store.items.filter(item => 
    item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="container fade-in">
    <div class="journal-controls">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search through your blessings..." 
        class="search-bar"
      />
    </div>

    <div class="timeline">
      <transition-group name="fade-slide">
        <div v-for="item in filteredItems" :key="item.id" class="timeline-item">
          <div class="date-side">{{ item.date }}</div>
          
          <div class="content-side">
            <div class="entry-meta">
              <span class="mood-badge">{{ item.mood }}</span>
              <span class="cat-tag">{{ item.category }}</span>
            </div>
            
            <p class="text">{{ item.text }}</p>
            
            <button @click="store.deleteItem(item.id)" class="del-btn">
              Remove from Chronicles
            </button>
          </div>
        </div>
      </transition-group>
      
      <div v-if="filteredItems.length === 0" class="empty-state">
        <p>No moments found matching your search.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Search Input Styling */
.search-bar {
  width: 100%;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  border: 1px solid rgba(0,0,0,0.05);
  background: var(--card-bg);
  margin-bottom: 4rem;
  outline: none;
  font-family: inherit;
  color: var(--text);
  box-shadow: var(--shadow-elegant);
  transition: var(--transition);
}

.search-bar:focus {
  border-color: var(--accent);
  transform: translateY(-2px);
}

/* Timeline Layout */
.timeline-item {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
}

.date-side {
  min-width: 120px;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: right;
  padding-top: 10px;
  letter-spacing: 1px;
}

/* Entry Card Styling */
.content-side {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 25px;
  box-shadow: var(--shadow-elegant);
  flex: 1;
  position: relative;
  border: 1px solid rgba(255,255,255,0.05);
  transition: var(--transition);
}

.content-side:hover {
  transform: scale(1.01);
}

.entry-meta {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cat-tag { 
  font-size: 0.7rem; 
  letter-spacing: 1px; 
  color: var(--accent); 
  font-weight: 700; 
  margin-left: 10px; 
  text-transform: uppercase; 
}

.text { 
  font-family: 'Cormorant Garamond', serif; 
  font-size: 1.5rem; 
  line-height: 1.4;
  font-style: italic;
  color: var(--text);
}

/* Delete Button */
.del-btn { 
  background: none; 
  border: none; 
  color: #ffbcbc; 
  cursor: pointer; 
  font-size: 0.7rem; 
  margin-top: 1.5rem; 
  opacity: 0.6;
  transition: 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.del-btn:hover { opacity: 1; color: #ff8e8e; }

/* Empty State Styling */
.empty-state {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-item { flex-direction: column; gap: 1rem; }
  .date-side { text-align: left; min-width: auto; }
  .content-side { padding: 1.5rem; }
}
</style>