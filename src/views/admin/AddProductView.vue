<script setup lang="ts">
import { useRouter } from 'vue-router';
import ProductForm from '@/components/forms/ProductForm.vue';
import { useProductStore } from '@/stores/product.store';
import { type CreateProduct } from '@/types/product';

import NavBarAdmin from "@/components/NavBarAdmin.vue";
import SideBarAdmin from "@/components/SideBarAdmin.vue";
import Footer from "@/components/navigation/Footer.vue";

const router = useRouter();
const productStore = useProductStore();


const handleSubmit = async (product: CreateProduct) => {
  try {
    await productStore.createProduct(product as CreateProduct);
    router.push({ name: 'Dashboard' });
  } catch (error) {
    console.error('Error al agregar el producto: ', error);
  }
};
</script>

<template>
  <v-app>
    <v-layout class="d-flex flex-column min-vh-100">
      <NavBarAdmin />
      <v-flex class="d-flex">
        <SideBarAdmin />
        <v-main class="d-flex flex-column flex-grow-1">
          <v-container class="bg-white mt-2 ml-2 border-rounded pa-0 flex-grow-1 main-container">
            <h1 class="text-h4 ma-5">Agregar producto</h1>
            <ProductForm @submit="handleSubmit" />
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
  display: flex;
  justify-content: start;
  flex-direction: column;
}
.min-vh-100 {
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
