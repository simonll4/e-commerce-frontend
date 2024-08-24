<template>
  <div class="product-list">
    <div v-if="isLoading">
      <h2>Cargando productos...</h2>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-cards">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToDetail(String(product.id))">
        <img :src="product.image" alt="Imagen del producto" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
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
  productStore.fetchUserProducts();
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



<!-- <template>
  <div class="product-list">
    <div v-if="isLoading">
      <h2>Cargando productos...</h2>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-cards">
      <div class="product-card" v-for="product in products" :key="product.id" @click="goToDetail(product.id)">
        <img :src="product.image" alt="Imagen del producto" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
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

const goToDetail = (id: number) => {
  router.push({ name: 'ProductDetail', params: { id } });
};

onMounted(() => {
  productStore.fetchUserProducts()
});

</script>

<style scoped>
/* Mantén los mismos estilos que anteriormente hemos creado */
.product-list {
  margin-top: 2rem;
  padding: 0 1rem;
}

.product-list h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 2rem;
  text-align: center;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  /* Mayor elevación al pasar el ratón */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  /* Sombra más pronunciada */
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
  text-align: center;
  background-color: #f8f9fa;
}

.product-info h3 {
  margin: 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
}

.product-price {
  margin-top: 0.75rem;
  color: #27ae60;
  font-weight: bold;
  font-size: 1.2rem;
}
</style> -->
