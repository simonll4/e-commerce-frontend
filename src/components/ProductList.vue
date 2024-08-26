<template>
  <div class="product-list">
    <div v-if="isLoading">
      <h2>Cargando productos...</h2>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-cards">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToDetail(String(product.id))">
        <!-- Usar imageData que ahora es una URL de datos base64 -->
        <img :src="product.imageData" alt="Imagen del producto" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';

const router = useRouter();
const productStore = useProductStore();
const { products, isLoading, error } = toRefs(productStore);

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
</style>
