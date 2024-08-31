<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useProductStore } from '@/stores/product.store';

import SearchFilterBar from '@/components/SearchFilterBar.vue';
import CarouselProduct from '@/components/ProductCarousel.vue';
import CategorySelector from '@/components/CategorySelector.vue';
import ProductList from '@/components/ProductList.vue';
import NavBar from '@/components/NavBar.vue';

import type { Product } from '@/types/product';


const router = useRouter();
const productStore = useProductStore();
const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

const defaultCategory = ['Laptop', 'Headphone', 'Mobile', 'Toys', 'Fashion', 'Other'];

// ir a detalle del producto
const goToDetail = (id: string) => {
  if (id) {
    router.push({ name: 'ProductDetail', params: { id } });
  } else {
    console.error('Product ID is missing');
  }
};

// Estado para manejar los filtros y ordenamientos
const selectedCategory = ref<string | null>(null);
const searchQuery = ref<string>('');
const selectedOrder = ref<string>('');


// Función para manejar los filtros combinados: categoría, búsqueda y ordenamiento
const filteredProducts = computed(() => {

  // Filtrado por categoría
  let filtered = products.value;
  if (selectedCategory.value) {
    filtered = filtered.filter((product) => product.category === selectedCategory.value);
  }

  // Filtrado por búsqueda
  if (searchQuery.value) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Ordenamiento
  if (selectedOrder.value === 'Precio: Menor a Mayor') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (selectedOrder.value === 'Precio: Mayor a Menor') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return filtered;
});


// Métodos que manejan la entrada del usuario desde el componente de filtrado
const selectCategory = (category: string) => {
  selectedCategory.value = category;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleOrderChange = (order: string) => {
  selectedOrder.value = order;
};

// Imitación de los productos más vendidos, seleccionados de manera aleatoria
const getRandomProducts = (products: Product[], count: number) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const bestSellingProducts = ref<Product[]>([]);

onMounted(() => {
  productStore.fetchProducts().then(() => {
    bestSellingProducts.value = getRandomProducts(products.value, 15);
  });
});

</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <v-container>

      <CarouselProduct :products="bestSellingProducts" @navigateToDetail="goToDetail" />

      <CategorySelector :categories="defaultCategory" :selectedCategory="selectedCategory"
        @selectCategory="selectCategory" />

      <SearchFilterBar @search="handleSearch" @orderChange="handleOrderChange" />

      <ProductList :isLoading="isLoading" :error="error" :filteredProducts="filteredProducts"
        @goToDetail="goToDetail" />

    </v-container>
  </main>
</template>

<style scoped></style>