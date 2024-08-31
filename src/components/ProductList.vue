<!-- <script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useProductStore } from '@/stores/product.store';
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import type { Product } from '@/types/product';

const router = useRouter();
const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

// ir a detalle del producto
const goToDetail = (id: string) => {
  if (id) {
    router.push({ name: 'ProductDetail', params: { id } });
  } else {
    console.error('Product ID is missing');
  }
};




// filtrado por categoría
const selectedCategory = ref<string | null>(null);
const selectCategory = (category: string) => {
  selectedCategory.value = category;
};
const filteredProductsByCategory = computed(() => {
  if (selectedCategory.value) {
    return products.value.filter(product => product.category === selectedCategory.value);
  }
  return products.value;
});

// Opciones de ordenamiento
const filteredProducts = ref<Product[]>([]);

// Maneja la lógica de búsqueda
const handleSearch = (query: string) => {
  filteredProducts.value = products.value.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Maneja la lógica de ordenamiento
const handleOrderChange = (order: string) => {
  if (order === 'Precio: Menor a Mayor') {
    filteredProducts.value.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (order === 'Precio: Mayor a Menor') {
    filteredProducts.value.sort((a, b) => Number(b.price) - Number(a.price));
  }
};


// imitacion de los productos mas vendidos
const getRandomProducts = (products: any[], count: number) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const bestSellingProducts = ref<any[]>([]);

onMounted(() => {
  productStore.fetchProducts().then(() => {
    bestSellingProducts.value = getRandomProducts(products.value, 15);
  });
});

</script> -->

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useProductStore } from '@/stores/product.store';
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import type { Product } from '@/types/product';

const router = useRouter();
const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

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
  console.log("aca",selectedOrder.value);
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
  console.log("order",order);
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
  <v-container>

    <!-- Sección de Carrusel -->
    <v-card class="mb-4">
      <v-card-title class="text-h6">Tus Productos mas Vendidos</v-card-title>
      <v-slide-group show-arrows>
        <v-slide-item v-for="(recentProduct, index) in bestSellingProducts" :key="index">
          <v-card class="mx-2" max-width="150" @click="goToDetail(String(recentProduct.id))" outlined>
            <v-img :src="recentProduct.imageURL" height="120" alt="Imagen del producto"></v-img>
            <v-card-subtitle class="text-h7 mt-1">
              $ {{ recentProduct.price }}
            </v-card-subtitle>
            <v-card-text class="text-body-2" style="font-size: 0.75rem;">
              {{ recentProduct.name }}
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-card>

    <!-- Sección de Tarjetas de Categorías -->
    <v-card-title class="text-h6">Categorias</v-card-title>
    <v-row class="mb-4" justify="center">
      <v-col cols="12" sm="6" md="4" lg="2"
        v-for="category in ['Laptop', 'Headphone', 'Mobile', 'Toys', 'Fashion', 'Other']" :key="category">
        <v-card @click="selectCategory(category)" outlined class="category-card">
          <v-img :src="`src/assets/images/${category}.avif`" height="140" alt="Imagen de categoría"></v-img>
          <v-card-title class="text-center" style="font-size: 0.8rem;">{{ category }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sección de Barra de Búsqueda y Ordenamiento
    <v-row no-gutters class="align-center" dense>
      <v-col cols="8">
        <v-text-field placeholder="Buscar productos, marcas y más..." prepend-inner-icon="mdi-magnify" outlined dense
          hide-details class="search-bar"></v-text-field>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-select :items="orderOptions" v-model="selectedOrder" label="Ordenar por" dense hide-details outlined
          class="order-select"></v-select>
      </v-col>
    </v-row> -->

    <SearchFilterBar @search="handleSearch" @orderChange="handleOrderChange" />
    <!-- Sección de Lista de Productos -->
    <v-row>
      <v-col cols="12">
        <v-alert v-if="isLoading" type="info">
          Cargando productos...
        </v-alert>
        <v-alert v-else-if="error" type="error">
          {{ error }}
        </v-alert>
      </v-col>

      <v-col v-if="filteredProducts.length === 0" cols="12" class="text-center">
        <v-card class="pa-4" outlined>
          <v-card-title>No hay productos disponibles en esta categoría</v-card-title>
        </v-card>
      </v-col>

      <v-col v-else v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card @click="goToDetail(String(product.id))" class="product-card" hover>
          <v-img :src="product.imageURL" alt="Imagen del producto" aspect-ratio="1.5" class="product-image"></v-img>
          <v-card-title class="text-h6">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-body-2 text-bold text-primary">
            ${{ product.price }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click.stop="goToDetail(String(product.id))">
              Ver Detalles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 280px;
  margin: auto;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 200px;
  /* Ajusta la altura total de la tarjeta */
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-card v-img {
  object-fit: cover;
}

.v-card-title {
  text-align: center;
  padding: 4px 8px;
  font-weight: 500;
}

@media (min-width: 1200px) {
  .category-card {
    max-width: 140px;
  }
}
</style>
