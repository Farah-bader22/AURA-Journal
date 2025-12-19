<script setup>
import { ref, computed } from 'vue'
import { useGratitudeStore } from '../stores/gratitudeStore'

const store = useGratitudeStore()
const searchQuery = ref('')

const filteredItems = computed(() => {
  return store.items.filter(item => 
    item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="container">
    <div class="journal-controls">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search through your blessings..." 
        class="search-bar"
      />
    </div>

    <div class="timeline">
      <div v-for="item in filteredItems" :key="item.id" class="timeline-item">
        <div class="date-side">{{ item.date }}</div>
        <div class="content-side">
          <span class="mood-badge">{{ item.mood }}</span>
          <span class="cat-tag">{{ item.category }}</span>
          <p class="text">{{ item.text }}</p>
          <button @click="store.deleteItem(item.id)" class="del-btn">Delete</button>
        </div>
      </div>
      
      <div v-if="filteredItems.length === 0" class="empty">
        No moments found matching your search.
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  border: 1px solid #eee;
  background: var(--card-bg);
  margin-bottom: 4rem;
  outline: none;
  font-family: inherit;
  box-shadow: var(--shadow-elegant);
}

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
}

.content-side {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-elegant);
  flex: 1;
  position: relative;
}

.cat-tag { font-size: 0.7rem; letter-spacing: 1px; color: var(--accent); font-weight: 700; margin-left: 10px; text-transform: uppercase; }
.text { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; margin-top: 1rem; }
.del-btn { background: none; border: none; color: #ffbcbc; cursor: pointer; font-size: 0.7rem; margin-top: 1rem; }
</style>