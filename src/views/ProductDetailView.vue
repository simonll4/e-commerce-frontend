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
  <header>
    <NavBar />
  </header>
  <div v-if="isLoading">Cargando...</div>
  <div v-else-if="product" class="product-detail">
    <ProductItem :product="product" />
  </div>
  <div v-else>
    Producto no encontrado.
  </div>
</template>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
