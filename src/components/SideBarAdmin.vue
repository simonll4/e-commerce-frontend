<script lang="ts" setup>
  import { useAuthStore } from "@/stores/auth.store";
  import { onMounted } from "vue";

  const authStore = useAuthStore();
  onMounted(() => {
    authStore.checkAuth();
  });
</script>

<template>
  <v-navigation-drawer
    class="mt-2 bg-light-blue-accent-3 rounded"
    elevation="1"
    absolute
    mobile-breakpoint="md"
  >
    <v-list>
      <v-list-item
        :prepend-avatar="
          authStore.user.avatar ||
          'https://imgs.search.brave.com/qkqL3Ff-Zt-okzMti7YwzIr0cmOzFUEU4C9rITf56aY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw'
        "
        :subtitle="authStore.user.email"
        :title="authStore.user.userName"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        prepend-icon="mdi-home"
        title="Inicio"
        value="home"
        to="/admin/"
        tag="router-link"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cart"
        title="Productos"
        value="products"
        to="/admin/products"
        tag="router-link"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Clientes"
        value="clients"
        to="/admin/customers"
        tag="router-link"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-wrench"
        title="Configuración"
        value="config"
        to="/admin/config"
        tag="router-link"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar Sesión"
        value="logout"
        to="/"
        tag="router-link"
        @click="authStore.logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
  .v-list-item {
    cursor: pointer;
    color: white;
  }
</style>
