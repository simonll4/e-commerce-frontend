<script setup lang="ts">
import Footer from "@/components/navigation/Footer.vue";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

import ProductDetailItem from "@/components/product/ProductDetailItem.vue";
</script>

<template>
  <v-app>
    <v-layout class="d-flex flex-column min-vh-100">
      <NavBar />
      <v-flex class="d-flex">
        <SideBar />
        <v-main class="d-flex flex-column flex-grow-1">
          <v-container
            class="bg-white mt-2 ml-2 border-rounded pa-0"
            elevation="1"
            rounded="md"
          >
            <ProductDetailItem />
          </v-container>
        </v-main>
      </v-flex>
    </v-layout>
  </v-app>
  <Footer />
</template>

<style scoped>
.welcome-title {
  font-weight: 500;
  padding: 10px;
}
.v-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.min-vh-100 {
  min-height: 100vh;
}
.flex-grow-1 {
  flex-grow: 1;
}
</style>
