<script setup lang="ts">
import NavBarAdmin from "@/components/NavBarAdmin.vue";
import SideBarAdmin from "@/components/SideBarAdmin.vue";
import Footer from "@/components/navigation/Footer.vue";

import Overview from "@/components/admin_dashboard/Overview.vue";
import ProductActivity from "@/components/admin_dashboard/ProductActivity.vue";
import ProductChartOverview from "@/components/admin_dashboard/ProductChartOverview.vue";
</script>

<template>
  <v-app>
    <v-layout class="d-flex flex-column min-vh-100">
      <NavBarAdmin />
      <v-flex class="d-flex">
        <SideBarAdmin />
        <v-main class="d-flex flex-column flex-grow-1">
          <v-container class="bg-white mt-2 ml-2 border-rounded pa-0 flex-grow-1 main-container">
            <h1 class="text-h4 ma-5">Inicio</h1>
            <Overview />
            <div class="product-data-overview">
              <v-row class="mt-3 ml-2">
                <v-col cols="8">
                  <ProductActivity />
                </v-col>
                <v-col cols="4">
                  <ProductChartOverview />
                </v-col>
              </v-row>
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
