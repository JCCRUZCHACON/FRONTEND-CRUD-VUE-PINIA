<script setup lang="ts">
import { useStudentsStore } from '../stores/studentsStore'
import type { Student } from '../types/student'

const store = useStudentsStore()

defineEmits<{
  (e: 'edit', student: Student): void
}>()
</script>



<template>
  <div class="list">
    <div v-for="student in store.students" :key="student.id" class="item">
      <div class="info">
        <span class="avatar">{{ student.name.charAt(0) }}</span>
        <span class="name">{{ student.name }}</span>
      </div>
      
      <div class="actions">
        <button class="edit" @click="$emit('edit', student)">Editar</button>
        <button class="delete" @click="store.deleteStudent(student.id!)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: grid;
  gap: 10px;
}

.item {
  background: white;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Móvil: Uno abajo de otro */
  gap: 15px;
  border-left: 5px solid #00d1b2;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  background: #edf2f7;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  color: #00d1b2;
}

.name {
  font-weight: 600;
  word-break: break-all;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos botones iguales */
  gap: 10px;
}

button {
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.edit { background: #ebf8ff; color: #3182ce; }
.delete { background: #fff5f5; color: #e53e3e; }

/* Desktop: Ajuste a una sola fila */
@media (min-width: 600px) {
  .item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .actions {
    display: flex; /* Botones más pequeños en desktop */
  }
}
</style>
