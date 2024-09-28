<script lang="ts" setup>
import { ref, computed, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product.store";

const router = useRouter();

const productStore = useProductStore();
const props = defineProps<{
  showButton: boolean;
  limitItems: boolean;
}>();

const search = ref<string>("");
const items = computed(() => productStore.getProductsByPage(1));

const headers = ref([
  { title: "#", key: "index" },
  { title: "Producto", key: "title" },
  { title: "Imagen", key: "image" },
  { title: "Precio", key: "price" },
  { title: "Stock", key: "stockQuantity" },
  { title: "Fecha de Creación", key: "createdAt" },
  { title: "Acciones", key: "actions" },
]);

if (!props.limitItems) {
  headers.value.splice(
    2,
    0,
    { title: "Descripción", key: "description" },
    { title: "Categoría", key: "category" },
    { title: "Marca", key: "brand" }
  );
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
// Idea del slice: Mostar solo 4 productos random en la tabla

const displayedItems = computed(() => {
  return props.limitItems ? items.value.slice(0, 4) : items.value;
});

const editProduct = (id: number) => {
  router.push({ path: `/admin/products/${id}/edit` })
};

// Estado para manejar el diálogo de confirmación de eliminación
const dialog = ref(false);
const productIdToDelete = ref<number | null>(null);

const confirmDeleteProduct = (id: number) => {
  productIdToDelete.value = id;
  dialog.value = true;
};

const deleteProduct = () => {
  if (productIdToDelete.value !== null) {
    productStore.deleteProduct(productIdToDelete.value.toString());
    dialog.value = false;
    productIdToDelete.value = null;
  }
};

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

      <template v-slot:item.actions="{ item }">
        <div class="pa-2">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon variant="text" flat v-bind="props" class="no-hover bg-white">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="item.id !== undefined && editProduct(item.id)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="item.id !== undefined && confirmDeleteProduct(item.id)">
                <v-list-item-title class="text-red">Borrar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
  </v-card>

  <div v-if="props.showButton" class="mt-4 d-flex justify-center">
    <v-btn class="bg-light-blue-accent-3" @click="goToProductManagerView">
      Ver todos los productos
    </v-btn>
  </div>

  <!-- Dialogo de confirmación -->
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text>
        ¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="no-hover" color="red" text="true" @click="dialog = false">Cancelar</v-btn>
        <v-btn class="no-hover" color="green" text="true" @click="deleteProduct">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>
.no-hover:hover {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>