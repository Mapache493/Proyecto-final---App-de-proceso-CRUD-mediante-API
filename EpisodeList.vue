<template>
  <div>
    <h2>Episodios</h2>
    <button @click="showForm = true" class="btn btn-primary mb-3">Agregar Episodio</button>
    
    <EpisodeForm 
      v-if="showForm" 
      :episode="currentEpisode"
      @save="saveEpisode"
      @cancel="cancelEdit"
    />
    
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Fecha de Emisión</th>
            <th>Personajes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="episode in episodes" :key="episode.id">
            <td>{{ episode.name }}</td>
            <td>{{ episode.episode }}</td>
            <td>{{ formatDate(episode.air_date) }}</td>
            <td>{{ episode.characters.length }} personajes</td>
            <td>
              <button @click="editEpisode(episode)" class="btn btn-sm btn-warning me-2">Editar</button>
              <button @click="deleteEpisode(episode.id)" class="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EpisodeForm from './EpisodeForm.vue'

export default {
  name: 'EpisodeList',
  components: { EpisodeForm },
  data() {
    return {
      episodes: [],
      showForm: false,
      currentEpisode: null
    }
  },
  created() {
    this.fetchEpisodes()
  },
  methods: {
    async fetchEpisodes() {
      const response = await axios.get('http://localhost:3000/episodes')
      this.episodes = response.data
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('es-ES', options)
    },
    editEpisode(episode) {
      this.currentEpisode = { ...episode }
      this.showForm = true
    },
    async deleteEpisode(id) {
      if (confirm('¿Estás seguro de eliminar este episodio?')) {
        await axios.delete(`http://localhost:3000/episodes/${id}`)
        this.fetchEpisodes()
      }
    },
    async saveEpisode(episode) {
      try {
        if (episode.id) {
          await axios.put(`http://localhost:3000/episodes/${episode.id}`, episode)
        } else {
          await axios.post('http://localhost:3000/episodes', episode)
        }
        this.showForm = false
        this.currentEpisode = null
        this.fetchEpisodes()
      } catch (error) {
        console.error('Error al guardar el episodio:', error)
      }
    },
    cancelEdit() {
      this.showForm = false
      this.currentEpisode = null
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>