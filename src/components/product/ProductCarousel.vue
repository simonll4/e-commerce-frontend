<script setup lang="ts">
import { ref } from 'vue';
import ProductItem from './ProductItem.vue';

const products = ref([
  {
    id: 1,
    name: 'Smartphone',
    description: 'Latest model with high-end features',
    price: '$999',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp'
  },
  {
    id: 2,
    name: 'Laptop',
    description: 'Powerful laptop for professionals',
    price: '$1999',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_720868-MLU72675284142_112023-O.webp'
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: '$299',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_844082-MLU77448376172_072024-O.webp'
  },
  {
    id: 4,
    name: 'Whirlpool Bed',
    description: 'Super comfy bed for sleeping like a baby',
    price: '$799',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_944972-MLA54385774876_032023-O.webp'
  }
]);
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