<template>
  <header>
    <div>
      <NavBar />
    </div>
  </header>

  <div>
    <ProductList />
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
.product-list h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
</style>