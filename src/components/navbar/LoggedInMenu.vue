<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  // Lógica para cerrar sesión
  router.push('/logout');
};

const goToAccount = () => {
  router.push('/account');
};
</script>

<template>
  <v-btn color="success" class="cart-button">
    <v-icon class="mdi mdi-cart"></v-icon>
    <span class="ml-2">Carrito</span>
  </v-btn>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn icon v-bind="props" class="bg-grey-lighten-4"> 
        <v-icon class="mdi mdi-dots-vertical bg-grey-lighten-4"></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="goToAccount">
        <v-list-item-title>
          <v-icon class="mdi mdi-account"></v-icon>
          Mi Cuenta
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleLogout">
        <v-list-item-title>
          <v-icon class="mdi mdi-logout text-red"></v-icon>
          Cerrar Sesión
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.cart-button:hover {
  background-color: #4CAF50;
  color: white;
}

.cart-button:hover .mdi-cart {
  color: white; /* Cambia el color del icono al hacer hover */
}

.cart-button:hover span {
  color: white; /* Cambia el color del texto al hacer hover */
}
</style>