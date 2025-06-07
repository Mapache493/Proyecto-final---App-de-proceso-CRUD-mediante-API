<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">{{ currentCharacter.id ? 'Editar' : 'Agregar' }} Personaje</h5>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="formData.name" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Especie</label>
          <input v-model="formData.species" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Género</label>
          <select v-model="formData.gender" class="form-select" required>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="Unknown">Desconocido</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Estado</label>
          <select v-model="formData.status" class="form-select" required>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Origen</label>
          <input v-model="formData.origin" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Ubicación</label>
          <input v-model="formData.location" type="text" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Imagen URL</label>
          <input v-model="formData.image" type="url" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary me-2">Guardar</button>
        <button type="button" @click="cancel" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterForm',
  props: {
    character: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '',
        species: '',
        gender: '',
        status: '',
        origin: '',
        location: '',
        image: ''
      }
    }
  },
  watch: {
    character: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = { ...newVal }
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
        species: '',
        gender: '',
        status: '',
        origin: '',
        location: '',
        image: ''
      }
    },
    handleSubmit() {
      this.$emit('save', this.formData)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>