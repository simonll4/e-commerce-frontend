<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import { type Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const productStore = useProductStore();

const goToEditProduct = () => {
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
};

const deleteProduct = async () => {
  try {
    console.log('ID del producto a eliminar:', props.product.id);
    await productStore.deleteProduct(String(props.product.id));
    console.log('Producto eliminado correctamente');
    router.push({ name: 'Home' });
  } catch (e) {
    console.error('Error al eliminar el producto', e);
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-4" max-width="600">
      <v-img :src="product.imageURL" height="300" class="mb-4"></v-img>
      <v-card-title>{{ product.name }}</v-card-title>
      <v-card-subtitle class="text-h6 text-primary mb-2">${{ product.price }}</v-card-subtitle>
      <v-card-text class="product-description">{{ product.description }}</v-card-text>
      <v-card-actions class="actions">
        <v-btn color="" class="edit-button" @click="goToEditProduct">Editar</v-btn>
        <v-btn color="" class="delete-button" @click="deleteProduct">Eliminar</v-btn>
        <v-btn color="" class="back-button" @click="() => router.push({ name: 'Home' })">Volver a Inicio</v-btn>
      </v-card-actions>
      <!-- <v-card-actions>
        <v-btn color="secondary" @click="() => router.push({ name: 'Home' })">Volver a Inicio</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: #f5f5f5;
}

.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-description {
  font-size: 1em;
  color: #616161;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.edit-button,
.delete-button {

  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #09f809;
  color: white;
}

.edit-button:hover {
  background-color: #178517;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.back-button {
  background-color: #2196f3;
  color: white;
}

.back-button:hover {
  background-color: #1976d2;
}
</style>






<!-- <script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import { type Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const productStore = useProductStore();

const goToEditProduct = () => {
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
};

const deleteProduct = async () => {
  try {
    console.log('ID del producto a eliminar:', props.product.id);
    await productStore.deleteProduct(String(props.product.id));
    console.log('Producto eliminado correctamente');
    router.push({ name: 'Home' });
  } catch (e) {
    console.error('Error al eliminar el producto', e);
  }
};
</script>

<template>
  <div class="product-item">
    <div class="image-wrapper">
      <img :src="product.imageURL" :alt="product.name" class="product-image" />
    </div>
    <div class="product-details">
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-price">${{ product.price }}</p>
      <p class="product-category"><strong>Categoría:</strong> {{ product.category }}</p>
      <p class="product-brand"><strong>Marca:</strong> {{ product.brand }}</p>
      <p class="product-availability" :class="{ available: product.productAvailable }">
        <strong>Disponibilidad:</strong> {{ product.productAvailable ? 'In stock' : 'Out of Stock' }}
      </p>
      <p class="product-stock"><strong>Cantidad en stock:</strong> {{ product.stockQuantity }}</p>
      <p class="product-release-date"><strong>Fecha de lanzamiento:</strong> {{ product.releaseDate }}</p>
      <p class="product-description">{{ product.description }}</p>
      <div class="actions">
        <button class="edit-button" @click="goToEditProduct">Editar</button>
        <button class="delete-button" @click="deleteProduct">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-item:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 1rem;
}

.product-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
}

.product-details {
  text-align: left;
  width: 100%;
}

.product-title {
  font-size: 2em;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.product-price {
  font-size: 1.5em;
  color: #4caf50;
  margin-bottom: 1rem;
  text-align: center;
}

.product-category,
.product-brand,
.product-availability,
.product-stock,
.product-release-date,
.product-description {
  font-size: 1em;
  margin-bottom: 0.75rem;
  color: #555;
}

.product-availability.available {
  color: #4caf50;
}

.product-availability {
  color: #f44336;
}

.product-description {
  font-size: 1em;
  color: #616161;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.edit-button,
.delete-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #2196f3;
  color: white;
}

.edit-button:hover {
  background-color: #1976d2;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style> -->