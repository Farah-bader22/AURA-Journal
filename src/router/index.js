import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JournalView from '../views/JournalView.vue'
import InsightsView from '../views/InsightsView.vue'
import JarView from '../views/JarView.vue' // استيراد الصفحة الجديدة

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
    component: JarView // إضافة مسار المرطبان
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router