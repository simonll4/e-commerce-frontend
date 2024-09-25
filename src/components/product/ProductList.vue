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
  },
  {
    id: 5,
    name: 'Smartwatch',
    description: 'Stay connected on the go',
    price: '$199',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_711882-MLA32740506185_112019-F.webp'
  },
  {
    id: 6,
    name: 'Tablet',
    description: 'Portable and powerful tablet',
    price: '$499',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_711882-MLA32740506185_112019-F.webp'
  },
  {
    id: 7,
    name: 'Camera',
    description: 'Capture your moments',
    price: '$599',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_711882-MLA32740506185_112019-F.webp'
  },
  {
    id: 8,
    name: 'Gaming Console',
    description: 'Next-gen gaming experience',
    price: '$399',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_711882-MLA32740506185_112019-F.webp'
  }
]);
</script>

<template>
  <div class="product-container">
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex justify-center"
      >
        <ProductItem :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.product-container {
  padding: 16px;
}
.v-col {
  margin-bottom: 16px;
}
</style>