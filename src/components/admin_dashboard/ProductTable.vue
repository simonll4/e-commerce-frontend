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
  const loadProducts = async () => {
    await productStore.fetchProducts(1);
  };

  const headers = ref([
    { text: "#", value: "index", width: "50px" },
    { text: "Producto", value: "title", width: "200px" },
    { text: "Imagen", value: "image", width: "100px" },
    { text: "Precio", value: "price", width: "100px" },
    { text: "Stock", value: "stockQuantity", width: "150px" },
    { text: "Fecha de Creación", value: "createdAt", width: "150px" },
  ]);

  onMounted(() => {
    console.log(items);
    console.log(headers.value);
    loadProducts();
  });
  // const items = ref<
  //   Array<{
  //     name: string;
  //     image: string;
  //     price: number;
  //     stock: boolean;
  //     createdAt: string;
  //   }>
  // >([
  //   {
  //     name: "Nebula GTX 3080",
  //     image: "1.png",
  //     price: 699.99,
  //     stock: true,
  //     createdAt: "2023-01-01",
  //   },
  //   {
  //     name: "Galaxy RTX 3080",
  //     image: "2.png",
  //     price: 799.99,
  //     stock: false,
  //     createdAt: "2023-02-01",
  //   },
  //   {
  //     name: "Orion RX 6800 XT",
  //     image: "3.png",
  //     price: 649.99,
  //     stock: true,
  //     createdAt: "2023-03-01",
  //   },
  //   {
  //     name: "Vortex RTX 3090",
  //     image: "4.png",
  //     price: 1499.99,
  //     stock: true,
  //     createdAt: "2023-04-01",
  //   },
  //   {
  //     name: "Cosmos GTX 1660 Super",
  //     image: "5.png",
  //     price: 229.99,
  //     stock: true,
  //     createdAt: "2023-05-01",
  //   },
  // ]);

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
      :headers="headers"
      :items="items"
      :hide-default-footer="props.limitItems"
      class="elevation-1"
      item-value="id"
    >
      <template v-slot:item.index="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:item.title="{ item }">
        {{ item.title }}
      </template>

      <template v-slot:item.image="{ item }">
        <v-img :src="item.images[0]" width="64" height="64" cover></v-img>
      </template>

      <template v-slot:item.price="{ item }"> ${{ item.price }} </template>

      <template v-slot:item.stockQuantity="{ item }">
        <v-chip
          :color="item.stockQuantity > 0 ? 'green' : 'red'"
          class="text-uppercase"
          size="small"
          label
        >
          {{ item.stockQuantity > 0 ? "In stock" : "Out of stock" }}
        </v-chip>
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString() }}
      </template>
    </v-data-table>
  </v-card>
  <div v-if="props.showButton" class="mt-4 d-flex justify-center">
    <v-btn class="bg-light-blue-accent-3" @click="goToProductManagerView">
      Ver todos los productos
    </v-btn>
  </div>
</template>
