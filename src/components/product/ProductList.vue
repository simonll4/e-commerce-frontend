<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import Paginator from '@/components/navigation/Paginator.vue';
import SearchProduct from '@/components/forms/SearchProduct.vue';
import { useProductStore } from '@/stores/product.store';
import { computed, onMounted, ref } from 'vue';

const productStore = useProductStore();

const currentPage = ref(1);
const products = computed(() => productStore.getProductsByPage(currentPage.value));
const isLoading = computed(() => productStore.isLoading); // usar esto para efectos de carga
const error = computed(() => productStore.error); // usar esto para mostrar errores

const loadProducts = async (page: number) => {
  currentPage.value = page;
  await productStore.fetchProducts(page);
};
const handleNextPage = (newPage: number) => {
  if (newPage <= productStore.totalPages) {
    loadProducts(newPage);
  }
};
const handlePrevPage = (newPage: number) => {
  if (newPage > 0) {
    loadProducts(newPage);
  }
};

onMounted(() => {
  loadProducts(currentPage.value);
});
</script>

<template>
  <div class="product-container">
    <SearchProduct />
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3" class="d-flex justify-center">
        <ProductItem :product="product" />
      </v-col>
    </v-row>
  </div>
  <!-- <Paginator :totalPages="productStore.totalPages" :currentPage="productStore.currentPage" /> -->
  <Paginator :totalPages="productStore.totalPages" :currentPage="currentPage" @next="handleNextPage"
    @prev="handlePrevPage" />
</template>

<style scoped>
.product-container {
  padding: 16px;
}

.v-col {
  margin-bottom: 16px;
}
</style>