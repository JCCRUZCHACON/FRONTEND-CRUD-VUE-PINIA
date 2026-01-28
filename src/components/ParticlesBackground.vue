<script setup lang="ts">
import { onMounted } from 'vue'

const initParticles = () => {
  // @ts-ignore
  if (window.particlesJS) {
    // @ts-ignore
    window.particlesJS('particles-js', {
      "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00d1b2" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#00d1b2",
          "opacity": 0.3,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3, // <--- Esto es lo que hace que se mueva
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" }
        }
      },
      "retina_detect": true
    });
  }
}

onMounted(() => {
  initParticles()
})
</script>

<template>
  <div id="particles-js"></div>
</template>

<style scoped>
#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50; /* Color oscuro de fondo */
  z-index: -1; /* Siempre atrás */
}
</style>