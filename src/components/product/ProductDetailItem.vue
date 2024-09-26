<script lang="ts" setup>
import { ref } from "vue";
import ProductImageCarousel from "@/components/product/ProductImageCarousel.vue";

const isAvailable = true; // Cambia esto según la disponibilidad del producto

const images = ref([
  "https://acdn.mitiendanube.com/stores/001/836/967/products/whatsapp-image-2024-09-04-at-3-35-47-pm-5-987bcf9a9faeccc14f17254758563147-640-0.webp",
  "https://acdn.mitiendanube.com/stores/001/836/967/products/whatsapp-image-2024-09-04-at-3-35-47-pm-3-6383fd6bc7e595e61817254758564058-640-0.webp",
  "https://acdn.mitiendanube.com/stores/001/836/967/products/whatsapp-image-2024-09-04-at-3-35-47-pm-2-1f75c7c7f994fe91e617254758580926-640-0.webp",
  "https://acdn.mitiendanube.com/stores/001/836/967/products/whatsapp-image-2024-09-04-at-3-35-47-pm-1-9f5109755ef7ac08f717254758596343-640-0.webp",
]);

const selectedImage = ref(0);
</script>

<template>
  <h1 class="text-h4 ma-5 mb-3">Remera de Franco Colapinto - F1</h1>
  <span class="ma-5">Ultima actualización: Jan 29, 2024, 2:39PM</span>
  <v-container grid-list-md class="activity-container ma-5">
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          :src="images[selectedImage]"
          alt="Imagen del producto"
          class="product-image"
          cover
          rounded="xl"
        ></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <div class="product-details">
          <div class="product-price text-h5 mb-3">$49.99</div>
          <div class="product-brand mb-2">Marca: XYZ</div>
          <div class="product-category mb-2">Categoría: Ropa</div>
          <v-chip
            class="product-availability"
            :color="isAvailable ? 'green' : 'red'"
            label
          >
            {{ isAvailable ? "Disponible" : "No disponible" }}
          </v-chip>
        </div>
      </v-col>
      <v-row>
        <v-col cols="12" md="8">
          <ProductImageCarousel
            :images="images"
            :selectedImage="selectedImage"
            @update:selectedImage="selectedImage = $event"
          />
        </v-col>
      </v-row>
    </v-row>
    <v-row class="ml-0">
      <v-col cols="12">
        <h4 class="mb-5">Descripción</h4>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque labore
          officia sapiente iure et vitae illum maxime cumque quidem fugit, nobis
          atque a fuga veniam possimus quia consequuntur blanditiis nostrum.
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.activity-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0;
  width: 60%;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.product-price {
  font-weight: bold;
}

.product-availability {
  margin-top: 10px;
}
</style>
