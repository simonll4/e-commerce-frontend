<template>
  <v-navigation-drawer
    class="mt-2 bg-light-blue-accent-3 rounded"
    elevation="1"
    absolute
    mobile-breakpoint="md"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        prepend-icon="mdi-home"
        title="Inicio"
        value="home"
        to="/admin/dashboard"
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
        to="/"
        tag="router-link"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar Sesión"
        value="logout"
        to="/"
        tag="router-link"
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
