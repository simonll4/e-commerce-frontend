<script setup lang="ts">
import { ref } from 'vue';

///////////////////////////////////////
// TODO: Implementar autenticación real
///////////////////////////////////////

// Simulación de estado de autenticación
const isLoggedIn = ref(true); 
</script>

<template>
  <v-app-bar :elevation="0" class="bg-grey-lighten-3">
    <v-container fluid>
      <v-row align="center" justify="space-between">
        <!-- Logo y título a la izquierda -->
        <v-col cols="4" class="d-flex align-center">
          <v-img
            src="/src/assets/images/logo_shop.svg"
            alt="Logo"
            max-height="50"
            max-width="50"
            class="mr-3 ml-0"
          ></v-img>
          <v-app-bar-title class="fw-bold logo-title text-h5 ml-2 d-lg-flex d-none">MiTienda.com</v-app-bar-title>
        </v-col>


        <v-col cols="4" class="d-flex justify-end align-center">
          <v-icon class="mdi mdi-account-circle"></v-icon>
          <span class="ml-2">Vista del Administrador</span>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
}

.nav-link:hover {
  color: #1976d2; /* Color de hover */
}

.no-truncate {
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}
</style>