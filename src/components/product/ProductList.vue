<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import Paginator from '@/components/navigation/Paginator.vue';
import OrderAndFilterProduct from '@/components/product/OrderAndFilterProduct.vue';
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

// Manejar el cambio de ordenamiento
const handleOrderChange = async (order: string) => {
  let sortBy = '';
  let sortDirection = '';
  switch (order) {
    case 'Precio: Menor a Mayor':
      sortBy = 'price';
      sortDirection = 'ASC';
      break;
    case 'Precio: Mayor a Menor':
      sortBy = 'price';
      sortDirection = 'DESC';
      break;
    default:
      break;
  }
  productStore.setSortOrder(sortBy, sortDirection);
  loadProducts(1);
};

const handleFilterChange = (filters: Record<string, any>) => {
  console.log("acaaaaaaaa",filters);
  productStore.setFilter(filters);
  loadProducts(1);
};


onMounted(() => {
  loadProducts(currentPage.value);
});
</script>

<template>
  <div class="product-container d-flex flex-row">
    
    <v-container class="bg-white mt-2 ml-2 border-rounded pa-0 flex-grow-1">
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex justify-center">
          <ProductItem :product="product" />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="bg-white w-50 mt-2 ml-2 border-rounded pa-0 flex-grow-1">
      <OrderAndFilterProduct @orderChange="handleOrderChange" @filterChange="handleFilterChange" />
    </v-container>

  </div>
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