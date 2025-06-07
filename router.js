import { createRouter, createWebHistory } from 'vue-router'
import CharactersView from './views/CharactersView.vue'
import EpisodesView from './views/EpisodesView.vue'
import LocationsView from './views/LocationsView.vue'

const routes = [
  { path: '/characters', component: CharactersView },
  { path: '/episodes', component: EpisodesView },
  { path: '/locations', component: LocationsView },
  { path: '/', redirect: '/characters' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router