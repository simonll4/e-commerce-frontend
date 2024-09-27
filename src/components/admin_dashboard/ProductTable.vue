<script lang="ts" setup>
import { ref, computed, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product.store";

const productStore = useProductStore();
const props = defineProps<{
  showButton: boolean;
  limitItems: boolean;
}>();

const search = ref<string>("");
const items = computed(() => productStore.getProductsByPage(1));

const headers = ref([
  { text: "#", value: "index" },
  { text: "Producto", value: "title" },
  { text: "Imagen", value: "image" },
  { text: "Precio", value: "price" },
  { text: "Stock", value: "stockQuantity" },
  { text: "Fecha de Creación", value: "createdAt" },
]);

if (!props.limitItems) {
  headers.value.splice(
    2,
    0,
    { text: "Descripción", value: "description" },
    { text: "Categoría", value: "category" },
    { text: "Marca", value: "brand" }
  );
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
// Idea del slice: Mostar solo 4 productos random en la tabla

const displayedItems = computed(() => {
  return props.limitItems ? items.value.slice(0, 4) : items.value;
});

const router = useRouter();

const goToProductManagerView = () => {
  router.push({ path: "/admin/products" });
};
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cart"></v-icon>
      <span class="ml-2">Productos</span>

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :headers="headers" :items="displayedItems"
      :hide-default-footer="props.limitItems" class="elevation-1" item-value="id">
      <template v-slot:item.index="{ index }">
        <div class="pa-2">{{ index + 1 }}</div>
      </template>

      <template v-slot:item.title="{ item }">
        <div class="pa-2">
          <router-link :to="{ name: 'ProductDetailAdmin', params: { id: item.id } }" class="text-decoration-none">
            {{ item.title }}
          </router-link>
        </div>
      </template>

      <template v-slot:item.description="{ item }">
        <div class="pa-2">{{ truncateText(item.description, 50) }}</div>
      </template>

      <template v-slot:item.image="{ item }">
        <div class="pa-2">
          <v-img :src="item.images[0]" width="64" height="64"></v-img>
        </div>
      </template>

      <template v-slot:item.price="{ item }">
        <div class="pa-2">${{ item.price }}</div>
      </template>

      <template v-slot:item.brand="{ item }">
        <div class="pa-2">{{ item.brand }}</div>
      </template>

      <template v-slot:item.category="{ item }">
        <div class="pa-2">{{ item.category.name }}</div>
      </template>

      <template v-slot:item.stockQuantity="{ item }">
        <div class="pa-2">
          <v-chip :color="item.stockQuantity > 0 ? 'green' : 'red'" class="text-uppercase" size="small" label>
            {{ item.stockQuantity > 0 ? "In stock" : "Out of stock" }}
          </v-chip>
        </div>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <div class="pa-2">
          {{ new Date(item.createdAt).toLocaleDateString() }}
        </div>
      </template>
    </v-data-table>
  </v-card>
  <div v-if="props.showButton" class="mt-4 d-flex justify-center">
    <v-btn class="bg-light-blue-accent-3" @click="goToProductManagerView">
      Ver todos los productos
    </v-btn>
  </div>
</template>
