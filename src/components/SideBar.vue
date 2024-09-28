<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { onMounted } from "vue";


const authStore = useAuthStore();
onMounted(() => {
    authStore.checkAuth();
});
</script>

<template>
    <v-navigation-drawer class="mt-2" elevation="1" absolute mobile-breakpoint="md">
        <v-list>
            <v-list-item
                :prepend-avatar="authStore.user.avatar || 'https://imgs.search.brave.com/qkqL3Ff-Zt-okzMti7YwzIr0cmOzFUEU4C9rITf56aY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw'"
                :subtitle="authStore.user.email" :title=authStore.user.userName></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <router-link to="/">
                <v-list-item prepend-icon="mdi-home" title="Inicio" value="home"></v-list-item>
            </router-link>
            <router-link to="sin-definir">
                <v-list-item prepend-icon="mdi-cart" title="Mis Compras" value="orders"></v-list-item>
            </router-link>
            <router-link to="sin-definir">
                <v-list-item prepend-icon="mdi-shopping" title="Explorar" value="products"></v-list-item>
            </router-link>
            <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesión" value="logout" class="text-red"
                @click="authStore.logout"></v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>