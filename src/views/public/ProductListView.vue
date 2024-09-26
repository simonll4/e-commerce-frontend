<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

import Footer from '@/components/navigation/Footer.vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import Paginator from '@/components/navigation/Paginator.vue';
import SearchProduct from '@/components/forms/SearchProduct.vue';
import ProductList from '@/components/product/ProductList.vue';

import { useProductStore } from '@/stores/product.store';

const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

const searchQuery = ref<string>('');
const selectedOrder = ref<string>('');


// Función para obtener más productos
const fetchMoreProducts = async () => {
    console.log('fetchMoreProducts');
    try {
        await productStore.fetchProducts();
        console.log('Productos obtenidos:', productStore.products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

onMounted(() => {
    fetchMoreProducts();
});
</script>

<template>
    <v-app>
        <v-layout class="d-flex flex-column min-vh-100">
            <NavBar />
            <v-col class="d-flex">
                <SideBar />
                <v-main class="d-flex flex-column flex-grow-1">
                    <v-container class="bg-white mt-2 ml-2 border-rounded pa-0 flex-grow-1">
                        <SearchProduct />
                        <ProductList :products="products" />
                        <Paginator :totalPages="productStore.totalPages" :currentPage="productStore.currentPage" />
                    </v-container>
                </v-main>
            </v-col>
        </v-layout>
    </v-app>
    <Footer />
</template>

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

<style scoped>
.nav-title {
    font-weight: 700;
    padding: 10px;
}

.v-container {
    border: 0.1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.min-vh-100 {
    min-height: 100vh;
}

.flex-grow-1 {
    flex-grow: 1;
}
</style>