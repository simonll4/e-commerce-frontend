<script setup lang="ts">
import NavBarAdmin from "@/components/NavBarAdmin.vue";
import SideBarAdmin from "@/components/SideBarAdmin.vue";
import Footer from "@/components/navigation/Footer.vue";

import ProductTable from "@/components/admin_dashboard/ProductTable.vue";
</script>

<template>
  <v-app>
    <v-layout class="d-flex flex-column min-vh-100">
      <NavBarAdmin />
      <v-flex class="d-flex">
        <SideBarAdmin />
        <v-main class="d-flex flex-column flex-grow-1">
          <v-container
            class="bg-white mt-2 ml-2 border-rounded pa-0 flex-grow-1 main-container"
          >
            <div class="d-flex justify-space-between align-center">
              <h1 class="text-h4 ma-5">Product Manager</h1>
              <v-btn class="bg-light-blue-accent-3 mr-9">
                Agregar producto
              </v-btn>
            </div>
            <div class="table-container ml-5 mb-2">
              <ProductTable :showButton="false" :limitItems="false" />
            </div>
          </v-container>
        </v-main>
      </v-flex>
    </v-layout>
  </v-app>
  <Footer />
</template>

<style scoped>
.main-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.table-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0;
  width: 97%;
}
.min-vh-100 {
  min-height: 100vh;
}
.flex-grow-1 {
  flex-grow: 1;
}
.product-data-overview {
  width: 96.2%;
}
</style>
