<script setup lang="ts">

import { toRefs, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useProductStore } from '@/stores/product.store';
import NavBar from '@/components/NavBar.vue';
import ProductItem from '@/components/ProductItem.vue';


const route = useRoute();
const productId = String(route.params.id);
const productStore = useProductStore();
const { isLoading } = toRefs(productStore);
const product = ref(productStore.getProductById(productId));


//Función asíncrona que verifica si el producto no está cargado
const fetchProduct = async () => {
  if (!product.value) {
    await productStore.fetchProductById(productId);
  }
};

onMounted(fetchProduct);

watch(
  () => productStore.products,
  () => {
    product.value = productStore.getProductById(productId);
  }
);
</script>

<template>
  <header>
    <div>
      <NavBar />
    </div>
  </header>
  <div>
    <div v-if="product" class="product-detail">
      <ProductItem :product="product" />
    </div>
    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p>Producto no encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
