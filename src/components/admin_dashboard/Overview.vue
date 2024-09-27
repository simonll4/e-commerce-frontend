<script lang="ts" setup>
import { useProductStore } from "@/stores/product.store";
import { useUserStore } from "@/stores/user.store";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const userStore = useUserStore();

const products = productStore.getProductsByPage(1);
const totalProducts = computed(() => products.length);

const totalUsers = computed(() => userStore.users.length);

const loadProducts = async () => {
  await productStore.fetchProducts(1);
};

const loadUsers = async () => {
  await userStore.fetchUsers();
};

onMounted(() => {
  loadProducts();
  loadUsers();
});

const router = useRouter();

const goToProductManagerView = () => {
  router.push({ path: "/admin/products" });
};

const goToUserManagerView = () => {
  router.push({ path: "/admin/customers" });
};
</script>

<template>
  <div class="d-flex">
    <v-container grid-list-md class="overview-container ml-5">
      <h4 class="mb-6">Overview</h4>
      <v-row>
        <v-col cols="4" class="overview-data">
          <div class="icon-container">
            <v-icon>mdi-chart-bar</v-icon>
          </div>
          <h4>Ventas totales</h4>
          <h2>$400.000</h2>
          <v-btn class="round-button" color="white" small>
            <span>Ver</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <div class="icon-container">
            <v-icon>mdi-cart</v-icon>
          </div>
          <h4>Productos totales</h4>
          <h2>{{ totalProducts }}</h2>
          <v-btn class="round-button" color="white" small @click="goToProductManagerView">
            <span>Ver</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <div class="icon-container">
            <v-icon>mdi-account</v-icon>
          </div>
          <h4>Usuarios totales</h4>
          <h2>{{ totalUsers }}</h2>
          <v-btn class="round-button" color="white" small @click="goToUserManagerView">
            <span>Ver</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.overview-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0;
  width: 95%;
}

.overview-data {
  display: flex;
  flex-direction: column;
}

.overview-data h4 {
  color: #333;
  font-size: 1rem;
  font-weight: 500;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #00b0ff;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.v-icon {
  color: white;
  /* Color del ícono */
}

.round-button {
  border-radius: 1rem;
  margin-top: 10px;
  width: 30px;
  height: 20px;
}
</style>
