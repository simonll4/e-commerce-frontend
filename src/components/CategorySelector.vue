<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define los props que recibirá el componente
const props = defineProps<{
  categories: string[];
  selectedCategory: string | null; // Nueva prop para la categoría seleccionada
}>();

// Define los eventos que emitirá el componente
const emits = defineEmits(['selectCategory']);

// Función para emitir el evento al seleccionar una categoría
const onCategorySelect = (category: string) => {
  emits('selectCategory', category);
};

// Genera la URL de la imagen basada en el nombre de la categoría
const getCategoryImageUrl = (category: string) => {
  return new URL(`../assets/images/${category}.avif`, import.meta.url).href;
};
</script>

<template>
  <v-card class="mb-4">
    <v-card-title class="text-h6">Categorías</v-card-title>
    <v-row class="mb-4" justify="center">
      <v-col cols="12" sm="6" md="4" lg="2" v-for="category in categories" :key="category">
        <v-card @click="onCategorySelect(category)" outlined class="category-card"
          :class="{ 'selected-card': category === selectedCategory }">
          <v-img :src="getCategoryImageUrl(category)" height="140" alt="Imagen de categoría"></v-img>
          <v-card-title class="text-center" style="font-size: 0.8rem;">
            {{ category }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.selected-card {
  border: 2px solid #42a5f5;
  /* Cambia el color o grosor según lo que desees */
  background-color: #e3f2fd;
  /* Fondo para destacar la categoría seleccionada */
}
</style>
