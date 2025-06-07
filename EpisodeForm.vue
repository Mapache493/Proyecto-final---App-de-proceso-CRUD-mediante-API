<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">{{ episode.id ? 'Editar' : 'Agregar' }} Episodio</h5>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nombre del Episodio</label>
          <input v-model="formData.name" type="text" class="form-control" required>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Código del Episodio (ej. S01E01)</label>
          <input 
            v-model="formData.episode" 
            type="text" 
            class="form-control" 
            pattern="S\d{2}E\d{2}"
            title="Formato: S##E## (ej. S01E01)"
            required
          >
          <small class="form-text text-muted">Formato: S##E## (ej. S01E01)</small>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Fecha de Emisión</label>
          <input v-model="formData.air_date" type="date" class="form-control" required>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Personajes (IDs separados por comas)</label>
          <input 
            v-model="formData.characters" 
            type="text" 
            class="form-control" 
            placeholder="Ej: 1,5,12"
          >
          <small class="form-text text-muted">IDs de personajes separados por comas</small>
        </div>
        
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary me-2">
            {{ episode.id ? 'Actualizar' : 'Guardar' }}
          </button>
          <button type="button" @click="cancel" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodeForm',
  props: {
    episode: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '',
        episode: '',
        air_date: '',
        characters: []
      }
    }
  },
  watch: {
    episode: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Convertir array de characters a string para el input
          const charactersStr = Array.isArray(newVal.characters) 
            ? newVal.characters.join(', ') 
            : newVal.characters || ''
            
          this.formData = { 
            ...newVal,
            characters: charactersStr
          }
        } else {
          this.resetForm()
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        name: '',
        episode: '',
        air_date: '',
        characters: []
      }
    },
    handleSubmit() {
      // Convertir string de characters a array de números
      const formattedData = {
        ...this.formData,
        characters: this.formData.characters
          .split(',')
          .map(id => parseInt(id.trim()))
          .filter(id => !isNaN(id))
      }
      
      this.$emit('save', formattedData)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-text {
  font-size: 0.875rem;
}
</style>