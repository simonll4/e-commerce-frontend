<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

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

// Escuchar cambios en searchQuery y selectedOrder para actualizar los productos
watch([searchQuery, selectedOrder], () => {
    onSearch();
    onOrderChange();
});
</script>

<template>
    <div class="container">
        <h2 class="nav-title d-flex justify-center align-center">¡Encontra los mejores productos!</h2>
        <span class="subtitle d-flex justify-center align-center">
            Navegá entre una amplia variedad y elegí tus favoritos
        </span>
        <v-row no-gutters class="align-center justify-center mb-4" dense>
            <v-col cols="8" class="mr-3">
                <v-text-field v-model="searchQuery" placeholder="Buscar productos, marcas y más..."
                    prepend-inner-icon="mdi-magnify" outlined dense hide-details class="search-bar"
                    @input="onSearch"></v-text-field>
            </v-col>
            <v-col cols="3" class="text-right">
                <v-select :items="orderOptions" v-model="selectedOrder" label="Ordenar por" placeholder="Ordenar por"
                    dense hide-details outlined class="order-select" @update:model-value="onOrderChange"></v-select>
            </v-col>
        </v-row>
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

.search-bar {
    max-width: 100%;
}

.order-select {
    max-width: 100%;
}
</style>
