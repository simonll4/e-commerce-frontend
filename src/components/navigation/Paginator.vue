<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['next', 'prev']);
const localCurrentPage = computed({
  get() {
    return props.currentPage;
  },
  set(value) {
    if (value > props.currentPage) {
      emit('next');
    } else if (value < props.currentPage) {
      emit('prev');
    }
  },
});
</script>

<template>
  <div class="text-center mt-3 mb-3">
    <v-pagination v-model="localCurrentPage" :length="props.totalPages" next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"></v-pagination>
  </div>
</template>
