<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ProductItem from './ProductItem.vue';
import { useProductStore } from '@/stores/product.store';

const productStore = useProductStore();

const products = computed(() => productStore.getProductsByPage(1));
const loadProducts = async () => {
  await productStore.fetchProducts(1);
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <v-slide-group show-arrows class="mb-3">
    <v-slide-item v-for="product in products" :key="product.id">
      <ProductItem :product="product" />
    </v-slide-item>
  </v-slide-group>
</template>

<style scoped>
.v-slide-group {
  width: 100%;
  height: 100%;
}
</style>