<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

// Props para recibir las opciones de ordenamiento
const props = defineProps({
  orderOptions: {
    type: Array as () => string[],
    default: () => ['Precio: Menor a Mayor', 'Precio: Mayor a Menor'],
  },
});

const emit = defineEmits(['search', 'orderChange']);
const searchQuery = ref('');
const selectedOrder = ref(null);

const onSearch = () => {
  emit('search', searchQuery.value);
};

const onOrderChange = () => {
  emit('orderChange', selectedOrder.value);
};
</script>

<template>
  <v-row no-gutters class="align-center mb-4" dense>
    <v-col cols="8">
      <v-text-field v-model="searchQuery" placeholder="Buscar productos, marcas y más..."
        prepend-inner-icon="mdi-magnify" outlined dense hide-details class="search-bar"
        @input="onSearch"></v-text-field>
    </v-col>
    <v-col cols="4" class="text-right">
      <v-select :items="orderOptions" v-model="selectedOrder" label="Ordenar por" placeholder="Ordenar por" dense
        hide-details outlined class="order-select" @update:model-value="onOrderChange"></v-select>
    </v-col>
  </v-row>
</template>

<style scoped>
.search-bar {
  max-width: 100%;
}

.order-select {
  max-width: 100%;
}
</style>
