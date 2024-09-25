<script setup lang="ts">
import { ref } from 'vue';

const images = ref([
  {
    src: 'https://http2.mlstatic.com/D_NQ_982376-MLA79113816738_092024-OO.webp',
    title: 'Las mejores ofertas en vinos',
    text: 'Hasta 25% off'
  },
  {
    src: 'https://http2.mlstatic.com/D_NQ_714559-MLA78990592158_092024-OO.webp',
    title: 'Equipa tu cama',
    text: 'Con colchas y esas cosas supongo'
  },
  {
    src: 'https://http2.mlstatic.com/D_NQ_777684-MLA77436518502_072024-OO.webp',
    title: 'Semana de descuentos',
    text: 'En ropas y seleccionados y alguna otra oferta que se me ocurra'
  },
  {
    src: 'https://media.istockphoto.com/id/1980326931/es/foto/dormitorio-moderno-y-acogedor-en-tonos-pastel.jpg?s=612x612&w=0&k=20&c=sDNLrAePRh7BS4betM1MLwHmCtZTzO3pKoYrtKtR8Ck=',
    title: 'Dormitorio moderno y acogedor',
    text: 'Con tonos pastel'
  }
]);
</script>

<template>
  <v-carousel show-arrows="hover" hide-delimiters height="400px" cycle interval="10000">
    <v-carousel-item v-for="(image, index) in images" :key="index" :src="image.src" cover>
      <div class="overlay-content">
        <h1 class="overlay-title">{{ image.title }}</h1>
        <p class="overlay-text">{{ image.text }}</p>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
.overlay-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.overlay-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.overlay-text {
  margin: 0;
  font-size: 16px;
}
</style>