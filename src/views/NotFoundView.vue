<template>
  <div class="error-view">
    <h1>404 - Página No Encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
    <router-link to="/">Volver al Inicio</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.error-view {
  text-align: center;
  margin-top: 50px;
}

.error-view h1 {
  font-size: 2rem;
  color: red;
}

.error-view p {
  font-size: 1.2rem;
}

.error-view a {
  color: blue;
  text-decoration: underline;
}
</style>