<script lang="ts" setup>
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  showButton: boolean;
  limitItems: boolean;
}>();

const search = ref<string>("");
const items = ref<
  Array<{
    name: string;
    image: string;
    price: number;
    stock: boolean;
    createdAt: string;
  }>
>([
  {
    name: "Nebula GTX 3080",
    image: "1.png",
    price: 699.99,
    stock: true,
    createdAt: "2023-01-01",
  },
  {
    name: "Galaxy RTX 3080",
    image: "2.png",
    price: 799.99,
    stock: false,
    createdAt: "2023-02-01",
  },
  {
    name: "Orion RX 6800 XT",
    image: "3.png",
    price: 649.99,
    stock: true,
    createdAt: "2023-03-01",
  },
  {
    name: "Vortex RTX 3090",
    image: "4.png",
    price: 1499.99,
    stock: true,
    createdAt: "2023-04-01",
  },
  {
    name: "Cosmos GTX 1660 Super",
    image: "5.png",
    price: 229.99,
    stock: true,
    createdAt: "2023-05-01",
  },
]);

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

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      v-model:search="search"
      :items="displayedItems"
      :hide-default-footer="props.limitItems"
    >
      <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <div class="text-start">
          {{ item.createdAt }}
        </div>
      </template>

      <template v-slot:item.stock="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.stock ? 'green' : 'red'"
            :text="item.stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
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
