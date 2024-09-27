<script setup lang="ts">
  import NavBarAdmin from "@/components/NavBarAdmin.vue";
  import SideBarAdmin from "@/components/SideBarAdmin.vue";
  import CustomerTable from "@/components/admin_dashboard/CustomerTable.vue";
  import Footer from "@/components/navigation/Footer.vue";
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
              <h1 class="text-h4 ma-5">Customer Manager</h1>
              <v-btn class="bg-light-blue-accent-3 mr-9" @click="">
                Agregar Usuario
              </v-btn>
            </div>
            <div class="table-container ml-5 mb-2">
              <CustomerTable />
            </div>
          </v-container>
        </v-main>
      </v-flex>
    </v-layout>
  </v-app>
  <Footer />
</template>
