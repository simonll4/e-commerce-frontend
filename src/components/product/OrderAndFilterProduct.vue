<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  orderOptions: {
    type: Array as () => string[],
    default: () => ["Precio: Menor a Mayor", "Precio: Mayor a Menor"],
  },
  brands: {
    type: Array as () => string[],
    default: () => ["Nike", "Adidas", "Puma"],
  }
});

const emit = defineEmits(["orderChange", "filterChange"]);

const selectedOrder = ref<string | null>(null);
const priceRange = ref<[number, number]>([0, 1000]);
const filters = ref({
  brand: "",
});

const applyFilters = () => {
  emit("filterChange", { ...filters.value, priceRange: priceRange.value });
  emit("orderChange", selectedOrder.value);
};

const resetFilters = () => {
  selectedOrder.value = null;
  priceRange.value = [0, 1000];
  filters.value = {
    brand: "",
  };
  emit("filterChange", { ...filters.value, priceRange: priceRange.value });
};

</script>

<template>
  <div class="container">
    <h2 class="nav-title d-flex justify-center align-center">
      ¡Encuentra los mejores productos!
    </h2>

    <v-card class="pa-4 mb-4">
      <v-card-title>
        Filtros de Productos
      </v-card-title>
      <v-card-text>
        <v-autocomplete v-model="selectedOrder" :items="orderOptions" label="Ordenar por" class="my-4" />
        <v-autocomplete v-model="filters.brand" :items="brands" label="Marca" class="my-4" />
        <v-btn @click="applyFilters" color="primary" class="my-2">
          Aplicar Filtros
        </v-btn>
        <v-btn @click="resetFilters" class="my-2">
          Limpiar Filtros
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.nav-title {
  font-weight: 700;
  font-size: 2rem;
  padding: 20px 0;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.order-select {
  max-width: 100%;
}
</style>
