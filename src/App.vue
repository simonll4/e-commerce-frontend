<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>

  <header>
    <div>

      <NavBar />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

    </div>
  </header>

  <RouterView />

</template>

<style scoped></style>
