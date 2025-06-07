<template>
  <div>
    <h2>Personajes</h2>
    <button @click="showForm = true" class="btn btn-primary mb-3">Agregar Personaje</button>
    
    <CharacterForm 
      v-if="showForm" 
      :character="currentCharacter"
      @save="saveCharacter"
      @cancel="cancelEdit"
    />
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="character in characters" :key="character.id">
        <div class="card h-100">
          <img :src="character.image" class="card-img-top" :alt="character.name">
          <div class="card-body">
            <h5 class="card-title">{{ character.name }}</h5>
            <p class="card-text"><strong>Especie:</strong> {{ character.species }}</p>
            <p class="card-text"><strong>Género:</strong> {{ character.gender }}</p>
            <p class="card-text"><strong>Estado:</strong> {{ character.status }}</p>
          </div>
          <div class="card-footer">
            <button @click="editCharacter(character)" class="btn btn-warning me-2">Editar</button>
            <button @click="deleteCharacter(character.id)" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CharacterForm from './CharacterForm.vue'

export default {
  name: 'CharacterList',
  components: { CharacterForm },
  data() {
    return {
      characters: [],
      showForm: false,
      currentCharacter: null
    }
  },
  created() {
    this.fetchCharacters()
  },
  methods: {
    async fetchCharacters() {
      const response = await axios.get('http://localhost:3000/characters')
      this.characters = response.data
    },
    editCharacter(character) {
      this.currentCharacter = { ...character }
      this.showForm = true
    },
    async deleteCharacter(id) {
      if (confirm('¿Estás seguro de eliminar este personaje?')) {
        await axios.delete(`http://localhost:3000/characters/${id}`)
        this.fetchCharacters()
      }
    },
    async saveCharacter(character) {
      if (character.id) {
        await axios.put(`http://localhost:3000/characters/${character.id}`, character)
      } else {
        await axios.post('http://localhost:3000/characters', character)
      }
      this.showForm = false
      this.currentCharacter = null
      this.fetchCharacters()
    },
    cancelEdit() {
      this.showForm = false
      this.currentCharacter = null
    }
  }
}
</script>