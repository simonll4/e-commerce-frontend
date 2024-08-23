<template>
  <div class="product-list">
    <h2>Productos Disponibles</h2>
    <!-- Pasar la lista de productos al componente ProductList -->
    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductList from '@/components/ProductList.vue';

// Simulación de productos con imágenes
const products = ref([
  { id: 1, name: 'Producto A', price: 100, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Producto B', price: 150, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Producto C', price: 200, image: 'https://via.placeholder.com/150' }
]);
</script>

<style scoped>
.product-list h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
</style>