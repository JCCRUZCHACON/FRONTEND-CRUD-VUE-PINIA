<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStudentsStore } from '../stores/studentsStore'
import type { Student } from '../types/student'

const store = useStudentsStore()

const props = defineProps<{
  student: Student | null
}>()

// Emitimos un evento para avisar al padre que ya no hay selección
const emit = defineEmits(['clear-selection'])

const name = ref<string>('')
const editing = ref<boolean>(false)

watch(
  () => props.student,
  (student) => {
    if (student) {
      name.value = student.name
      editing.value = true
    }
  }
)


const resetForm = () => {
  name.value = ''
  editing.value = false
  emit('clear-selection') // Avisamos al App.vue que limpie el selectedStudent
}


const submit = () => {
  if (!name.value) return

  if (editing.value && props.student?.id) {
    store.updateStudent(props.student.id, {
      name: name.value
    })
  } else {
    store.createStudent({ name: name.value })
  }

  name.value = ''
  editing.value = false

  resetForm()
}
</script>


<template>
  <div class="card">
    <form @submit.prevent="submit" class="student-form">
      <div class="form-group">
        <label>{{ editing ? 'Editando Estudiante' : 'Nuevo Estudiante' }}</label>
        <input v-model="name" placeholder="Ej. Leanne Graham" />
        
        <div class="button-group">
          <button type="submit" :class="{ 'btn-update': editing }">
            {{ editing ? 'Guardar Cambios' : 'Crear Estudiante' }}
          </button>
          
          <button 
            v-if="editing" 
            type="button" 
            class="btn-cancel" 
            @click="resetForm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.form-group {
  display: grid;
  gap: 12px; /* Espacio vertical uniforme */
}

label {
  font-size: 0.8rem;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #edf2f7;
  border-radius: 8px;
  box-sizing: border-box; /* Evita que el padding lo ensanche */
  font-size: 16px; /* Evita zoom automático en iPhone */
}

button {
  width: 100%;
  padding: 14px;
  background: #00d1b2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

/* En pantallas más grandes que 600px, lo ponemos en fila */
@media (min-width: 600px) {
  .form-group {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
  label {
    grid-column: span 2;
  }
}

.button-group {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr; /* Por defecto uno sobre otro en móvil */
}

@media (min-width: 400px) {
  .button-group {
    grid-template-columns: 1fr 1fr; /* En pantallas un poco más grandes, lado a lado */
  }
}

.btn-cancel {
  background: #edf2f7;
  color: #4a5568;
  border: 1px solid #cbd5e0;
}

.btn-cancel:hover {
  background: #e2e8f0;
}
</style>
