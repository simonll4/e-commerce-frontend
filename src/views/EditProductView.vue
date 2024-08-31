<script setup lang="ts">

import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type Product } from '@/types/product';
import { useProductStore } from '@/stores/product.store';

import ProductForm from '@/components/forms/ProductForm.vue';
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const productId = route.params.id as string;

const product = computed(() => productStore.getProductById(productId));


onMounted(async () => {
  if (!product.value) {
    try {
      await productStore.fetchProductById(productId);
      if (!product.value) {
        console.error("Producto no encontrado después de cargar."); // To-Do notificacion
        router.push({ name: 'Home' });
      }

    } catch (error) {
      console.error('Error al cargar el producto:', error); // To-Do notificacion
      router.push({ name: 'Home' });

    }
  }
});

const updateProduct = async (updatedProduct: Product) => {
  if (product.value) {
    try {
      await productStore.updateProduct(productId, updatedProduct);
      router.push({ name: 'ProductDetail', params: { id: productId } });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  } else {
    console.error('No se puede actualizar: Producto no encontrado.');
  }
};

</script>

<!-- <template>
  <header>
    <div>
      <NavBar />
    </div>
  </header>
  <ProductForm :product="product" @submit="updateProduct" />
</template> -->

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <v-app>
      <v-container>

        <v-row>
          <v-col cols="12">
            <ProductForm :product="product" @submit="updateProduct" />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </main>
</template>

<style scoped></style>
