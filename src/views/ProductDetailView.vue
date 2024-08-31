<script setup lang="ts">
import { computed, watch, onMounted, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import { useProductStore } from '@/stores/product.store';
import NavBar from '@/components/NavBar.vue';
import ProductItem from '@/components/ProductItem.vue';

const route = useRoute();
const productId = String(route.params.id);
const productStore = useProductStore();
const { isLoading } = toRefs(productStore);
const product = computed(() => productStore.getProductById(productId));

// Función asíncrona que verifica si el producto no está cargado
const fetchProduct = async () => {
  if (!product.value) {
    await productStore.fetchProductById(productId);
  }
};

onMounted(fetchProduct);

// Observa cambios en el 'productId' y recarga el producto cuando cambie
watch(
  () => productStore.products,
  () => {
    fetchProduct();
  }
);
</script>

<template>
  <v-app>
    <header>
      <NavBar />
    </header>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-if="isLoading" class="text-center my-5">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <div>Cargando...</div>
          </div>
          <div v-else-if="product" class="product-detail">
            <ProductItem :product="product" />
          </div>
          <div v-else class="text-center my-5">
            Producto no encontrado.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
