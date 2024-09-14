<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useProductStore } from '@/stores/product.store';

import SearchFilterBar from '@/components/SearchFilterBar.vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import CategorySelector from '@/components/CategorySelector.vue';
import ProductList from '@/components/ProductList.vue';
import NavBar from '@/components/NavBar.vue';

import type { Product } from '@/types/product';

const router = useRouter();
const productStore = useProductStore();

productStore.fetchProducts();
productStore.fetchProductById('1');

productStore.deleteProduct("14");

productStore.updateProduct("1", {
    title: "al mati le gusta el front",
    price: 44,
    description: "hay los coloressss",
    brand: "iua",
});

// const producto22 = {
//     title: "al mati le gusta el front",
//     price: 44,
//     description: "hay los coloressss",
//     brand: "iua",
//     images: [
//         "https://i.imgur.com/QkIa5tT.jpeg",
//         "https://i.imgur.com/jb5Yu0h.jpeg",
//         "https://i.imgur.com/UlxxXyG.jpeg"
//     ],
//     categoryId: 1
// }
// productStore.createProduct(producto22);

// // ir a detalle del producto
// const goToDetail = (id: string) => {
//   if (id) {
//     router.push({ name: 'ProductDetail', params: { id } });
//   } else {
//     console.error('Product ID is missing');
//   }
// };

// const displayedProducts = computed(() => productStore.products);
// const isLoading = computed(() => productStore.isLoading);
// const error = computed(() => productStore.error);
// const hasMoreProducts = computed(() => productStore.hasMoreProducts);

// const isSpinnerLoading = ref(false);

// const fetchMoreProducts = async () => {
//   console.log('fetchMoreProducts');
//   if (!isLoading.value && hasMoreProducts.value) {
//     await productStore.fetchProducts(productStore.currentPage + 1);
//     isSpinnerLoading.value = true;
//   }
// };

// const defaultsCategories = ['Laptop', 'Headphone', 'Mobile', 'Toys', 'Fashion', 'Other'];
// const selectedCategory = ref<string | null>(null);
// const searchQuery = ref<string>('');
// const selectedOrder = ref<string>('');

// // Función para manejar los filtros combinados: categoría, búsqueda y ordenamiento
// const filteredProducts = computed(() => {
//   let filtered = displayedProducts.value;
//   // Filtrado por categoría
//   // if (selectedCategory.value) {
//   //   filtered = filtered.filter((product) => product.category === selectedCategory.value);
//   // }
//   // Filtrado por búsqueda
//   // if (searchQuery.value) {
//   //   filtered = filtered.filter((product) =>
//   //     product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   //   );
//   // }
//   // Ordenamiento
//   if (selectedOrder.value === 'Precio: Menor a Mayor') {
//     // ToDo fetch sort, piso los productos del store y comienzo a paginar de nuevo
//     // filtered = displayedProducts.value;
//     filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
//   } else if (selectedOrder.value === 'Precio: Mayor a Menor') {
//     //ToDo fetch sort, piso los productos del store y comienzo a paginar de nuevo 
//     //filtered = displayedProducts.value;
//     filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
//   }
//   return filtered;
// });

// // Métodos que manejan la entrada del usuario desde el componente de filtrado
// const selectCategory = (category: string) => {
//   selectedCategory.value = category;
// };
// const handleSearch = (query: string) => {
//   searchQuery.value = query;
// };
// const handleOrderChange = (order: string) => {
//   selectedOrder.value = order;
// };

// // Imitación de los productos más vendidos, seleccionados de manera aleatoria
// const bestSellingProducts = ref<Product[]>([]);
// const getRandomProducts = (products: Product[], count: number) => {
//   const shuffled = products.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };

// onMounted(() => {
//   productStore.fetchProducts().then(() => {
//     bestSellingProducts.value = getRandomProducts(displayedProducts.value, 10);
//   });
// });
</script>

<template>
  <header>
    <NavBar />
  </header>

  <!-- <main>
    <v-container>

      <ProductCarousel :products="bestSellingProducts" @navigateToDetail="goToDetail" />

      <CategorySelector :categories="defaultsCategories" :selectedCategory="selectedCategory"
        @selectCategory="selectCategory" />

      <SearchFilterBar @search="handleSearch" @orderChange="handleOrderChange" />

      <ProductList :isLoading="isLoading" :isSpinnerLoading="isSpinnerLoading" :error="error"
        :products="filteredProducts" :goToDetail="goToDetail" :fetchMoreProducts="fetchMoreProducts" />

    </v-container>
  </main> -->
</template>

<style scoped></style>