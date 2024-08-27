<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';

const router = useRouter();
const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

const goToDetail = (id: string) => {
  if (id) {
    router.push({ name: 'ProductDetail', params: { id } });
  } else {
    console.error('Product ID is missing');
  }
};

onMounted(() => {
  productStore.fetchProducts();
});

</script>

<template>
  <div class="product-list">
    <div v-if="isLoading">
      <h2>Cargando productos...</h2>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-cards">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToDetail(String(product.id))">
        <div class="product-image-wrapper">
          <img :src="product.imageURL" alt="Imagen del producto" class="product-image" />
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  margin-top: 2rem;
  padding: 0 2rem;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.product-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image-wrapper {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info {
  padding: 1rem;
  text-align: center;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1rem;
  color: #e74c3c;
  font-weight: bold;
}
</style>

<!-- <template>
  <div class="product-list">
    <div v-if="isLoading">
      <h2>Cargando productos...</h2>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-cards">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToDetail(String(product.id))">
        <img :src="product.imageURL" alt="Imagen del producto" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  margin-top: 2rem;
  padding: 0 1rem;
}

.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  margin-top: 1rem;
}

.product-price {
  color: #2c3e50;
  font-weight: bold;
}
</style> -->
