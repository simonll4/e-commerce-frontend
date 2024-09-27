<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user.store";

  const userStore = useUserStore();

  const search = ref<string>("");
  const items = computed(() => userStore.users);

  const headers = ref([
    { text: "#", value: "index" },
    { text: "Nombre", value: "name" },
    { text: "Rol", value: "role" },
    { text: "Email", value: "email" },
    { text: "Avatar", value: "avatar" },
    { text: "Fecha de Creación", value: "createdAt" },
  ]);

  const router = useRouter();
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
      class="elevation-1"
      item-value="id"
    >
      <template v-slot:item.index="{ index }">
        <div class="pa-2">{{ index + 1 }}</div>
      </template>

      <template v-slot:item.name="{ item }">
        <div class="pa-2">
          {{ item.name }}
        </div>
      </template>

      <template v-slot:item.role="{ item }">
        <div class="pa-2">
          {{ item.role }}
        </div>
      </template>

      <template v-slot:item.email="{ item }">
        <div class="pa-2">
          {{ item.email }}
        </div>
      </template>

      <template v-slot:item.avatar="{ item }">
        <div class="pa-2">
          <v-img :src="item.avatar" width="50" height="50" contain></v-img>
        </div>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <div class="pa-2">
          {{ new Date(item.createdAt).toLocaleDateString() }}
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
