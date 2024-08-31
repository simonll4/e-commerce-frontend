<script setup lang="ts">
</script>

<template>
  <v-container class="error-view" fluid>
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-icon large color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
        <h1 class="display-1 font-weight-bold">404 - Página No Encontrada</h1>
        <p class="subtitle-1">Lo sentimos, la página que estás buscando no existe.</p>
        <v-btn color="primary" class="mt-4" @click="$router.push('/')">
          Volver al Inicio
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.error-view {
  height: 100vh;
}

.v-btn {
  text-transform: none;
}
</style>
