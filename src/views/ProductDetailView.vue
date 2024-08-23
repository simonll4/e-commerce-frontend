<template>
  <div v-if="product" class="product-detail">
    <ProductItem :product="product" />
    <p>{{ product.description }}</p> 
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Product } from '@/types/product';
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
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
