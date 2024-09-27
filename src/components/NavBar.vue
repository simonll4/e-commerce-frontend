<script setup lang="ts">
import { computed } from 'vue';
import LoggedInMenu from '@/components/navbar/LoggedInMenu.vue';
import LoggedOutMenu from '@/components/navbar/LoggedOutMenu.vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const isAuthenticated = computed(() => localStorage.getItem('token'));
</script>

<template>
  <v-app-bar :elevation="1" class="bg-grey-lighten-4">
    <v-container fluid>
      <v-row align="center" justify="space-between">
        <!-- Logo y título a la izquierda -->
        <v-col cols="4" class="d-flex align-center">
          <v-img src="/src/assets/images/logo_shop.svg" alt="Logo" max-height="50" max-width="50"
            class="mr-3 ml-0"></v-img>
          <v-app-bar-title class="fw-bold logo-title text-h5 ml-2 d-lg-flex d-none">MiTienda.com</v-app-bar-title>
        </v-col>

        <!-- Botones de navegación en el centro -->
        <v-col cols="4" class="d-md-flex d-none justify-center">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/products" class="nav-link">Products</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </v-col>

        <!-- Menú a la derecha según el estado de autenticación -->
        <v-col cols="4" class="d-flex justify-end align-center">
          <component :is="isAuthenticated ? LoggedInMenu : LoggedOutMenu" />
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
  color: #1976d2;
  /* Color de hover */
}

.no-truncate {
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}
</style>