<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStudentsStore } from './stores/studentsStore'
import type { Student } from './types/student'

import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'
import ParticlesBackground from './components/ParticlesBackground.vue';

const store = useStudentsStore()
const selectedStudent = ref<Student | null>(null)

onMounted(() => {
  store.getStudents()
})
</script>

<template>
    <ParticlesBackground /> 
    <div class="app-container">
    <header>
      <h1>CRUD ESTUDIANTES</h1>
      <p>GESTION DE ALUMNOS CON VUE 3 + TS + PINIA</p>
    </header>

    <main>
      <section>
        <StudentForm :student="selectedStudent" />
      </section>

      <section>
        <StudentList @edit="selectedStudent = $event" />
      </section>
    </main>
  </div>
</template>


<style>
/* 1. RESET Y CONFIGURACIÓN BASE */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

body {
  /* Flexbox para centrar en pantallas grandes */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent !important;
  padding: 20px; /* Espacio de seguridad para móviles */
}

/* 2. CONTENEDOR PRINCIPAL (EL CRISTAL) */
.app-container {
  width: 100%;
  max-width: 650px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Soporte para Safari */
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  /* Control de altura para PC */
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 3. SCROLL INTERNO (Para la lista de estudiantes) */
/* Hacemos que solo la lista scrollee, no todo el contenedor */
main {
  overflow-y: auto;
  padding-right: 5px; /* Espacio para el scrollbar */
}

/* 4. TIPOGRAFÍA */
h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #00d1b2;
  margin-bottom: 5px;
  font-weight: 800;
}

header p {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

/* 5. ANIMACIÓN */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 6. RESPONSIVE (Móvil 320px en adelante) */
@media (max-width: 480px) {
  body {
    align-items: flex-start; /* En móvil que empiece desde arriba */
    padding: 15px;
  }

  .app-container {
    padding: 20px;
    max-height: none; /* En móvil que crezca lo que necesite */
    margin-top: 20px;
    border-radius: 20px;
  }

  h1 {
    font-size: 1.4rem;
  }
}

/* 7. SCROLLBAR PERSONALIZADA */
.app-container main::-webkit-scrollbar {
  width: 5px;
}
.app-container main::-webkit-scrollbar-track {
  background: transparent;
}
.app-container main::-webkit-scrollbar-thumb {
  background: #00d1b2;
  border-radius: 10px;
}
</style>




