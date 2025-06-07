<template>
  <div>
    <h2>Ubicaciones</h2>
    <button @click="showForm = true" class="btn btn-primary mb-3">Agregar Ubicación</button>
    
    <LocationForm 
      v-if="showForm" 
      :location="currentLocation"
      @save="saveLocation"
      @cancel="cancelEdit"
    />
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="location in locations" :key="location.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ location.name }}</h5>
            <p class="card-text"><strong>Tipo:</strong> {{ location.type }}</p>
            <p class="card-text"><strong>Dimensión:</strong> {{ location.dimension }}</p>
          </div>
          <div class="card-footer">
            <button @click="editLocation(location)" class="btn btn-warning me-2">Editar</button>
            <button @click="deleteLocation(location.id)" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LocationForm from './LocationForm.vue'

export default {
  name: 'LocationList',
  components: { LocationForm },
  data() {
    return {
      locations: [],
      showForm: false,
      currentLocation: null
    }
  },
  created() {
    this.fetchLocations()
  },
  methods: {
    async fetchLocations() {
      const response = await axios.get('http://localhost:3000/locations')
      this.locations = response.data
    },
    editLocation(location) {
      this.currentLocation = { ...location }
      this.showForm = true
    },
    async deleteLocation(id) {
      if (confirm('¿Estás seguro de eliminar esta ubicación?')) {
        await axios.delete(`http://localhost:3000/locations/${id}`)
        this.fetchLocations()
      }
    },
    async saveLocation(location) {
      try {
        if (location.id) {
          await axios.put(`http://localhost:3000/locations/${location.id}`, location)
        } else {
          await axios.post('http://localhost:3000/locations', location)
        }
        this.showForm = false
        this.currentLocation = null
        this.fetchLocations()
      } catch (error) {
        console.error('Error al guardar la ubicación:', error)
      }
    },
    cancelEdit() {
      this.showForm = false
      this.currentLocation = null
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.card-footer {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: none;
}
</style>