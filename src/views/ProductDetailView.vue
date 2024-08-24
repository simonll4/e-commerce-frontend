<template>

  <header>
    <div>
      <NavBar />
    </div>
  </header>
  <div>
    <div v-if="product" class="product-detail">
      <ProductItem :product="product" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>

</template>


<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref, watch } from 'vue'; // Import the 'watch' function
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product.store';
import ProductItem from '@/components/ProductItem.vue';
import { toRefs } from 'vue';

const route = useRoute();
const productId = String(route.params.id);
const productStore = useProductStore();
const { getProductById, isLoading, error } = toRefs(productStore);
const product = ref(getProductById.value(productId.toString()) || undefined);

const fetchProduct = async () => {
  if (!product.value) {
    try {
      await productStore.fetchUserProducts();
      product.value = getProductById.value(productId);
    } catch (err) {
      console.error('Error al cargar el producto:', err);
    }
  }
};

onMounted(fetchProduct);
watch(
  () => productStore.products,
  () => {
    product.value = getProductById.value(productId);
  },
  { deep: true }
);

</script>


<!-- CON FAKESTOREAPI -->
<!-- <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { type Product } from '@/types/product';
import axios from 'axios';
import ProductItem from '@/components/ProductItem.vue';

export default defineComponent({
  name: 'ProductDetailView',
  components: { ProductItem },
  setup() {
    const route = useRoute();
    const product = ref<Product | null>(null);

    const fetchProduct = async () => {
      const id = route.params.id;
      try {
        const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        product.value = data;
      } catch (err) {
        console.error('Error al cargar el producto:', err);
      }
    };

    onMounted(fetchProduct);

    return { product };
  },
});
</script> -->

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
