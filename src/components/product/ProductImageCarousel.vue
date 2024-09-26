<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{ images: string[], selectedImage: number }>();
const emit = defineEmits(['update:selectedImage']);

const selectedImage = ref(props.selectedImage);

watch(selectedImage, (newValue) => {
  emit('update:selectedImage', newValue);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-item-group v-model="selectedImage" mandatory>
          <v-row>
            <v-col
              v-for="(image, index) in props.images"
              :key="index"
              cols="6"
              sm="4"
              md="3"
            >
              <v-item>
                <template v-slot:default="{ isSelected, toggle }">
                  <v-img
                    :src="image"
                    :class="{ 'selected-image': isSelected }"
                    @click="toggle"
                    class="carousel-image"
                    cover
                    rounded="lg"
                    max-height="140"
                    max-width="150"
                  ></v-img>
                </template>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: auto;
  max-height: 140px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
}

.selected-image {
  border-color: #42A5F5;
}
</style>