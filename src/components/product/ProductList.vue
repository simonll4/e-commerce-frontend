<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import type { Product } from '@/types/product';

const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
});

</script>

<template>
  <div class="product-container">
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3" class="d-flex justify-center">
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