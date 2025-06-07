<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">{{ location.id ? 'Editar' : 'Agregar' }} Ubicación</h5>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="formData.name" type="text" class="form-control" required>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Tipo</label>
          <input v-model="formData.type" type="text" class="form-control" required>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Dimensión</label>
          <input v-model="formData.dimension" type="text" class="form-control" required>
        </div>
        
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary me-2">
            {{ location.id ? 'Actualizar' : 'Guardar' }}
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
  name: 'LocationForm',
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '',
        type: '',
        dimension: ''
      }
    }
  },
  watch: {
    location: {
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
        type: '',
        dimension: ''
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

<style scoped>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-control {
  border-radius: 4px;
}
</style>