<template>
    <v-navigation-drawer class="mt-2" elevation="1" absolute mobile-breakpoint="md">
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Inicio" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-cart" title="Mis Compras" value="orders"></v-list-item>
            <v-list-item prepend-icon="mdi-shopping" title="Explorar" value="products"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesión" value="logout" class="text-red"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>