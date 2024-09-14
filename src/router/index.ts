// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/stores/auth.store';
import LoginView from '@/views/auth/LoginView.vue';

const routes = [

  {
    path: '/auth/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () => import('@/views/AddProductView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: () => import('@/views/EditProductView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Si la ruta no requiere autenticación, dejar continuar
  if (!requiresAuth) {
    return next();
  }

  // Si la ruta requiere autenticación, verificar si el usuario está autenticado
  const isAuthenticated = await authStore.checkAuth();

  if (isAuthenticated) {
    // Si está autenticado y trata de ir a login, redirigir al Home
    if (to.name === 'Login') {
      return next({ name: 'Home' });
    }
    return next(); // Permitir acceso a rutas protegidas si está autenticado
  } else {
    // Si no está autenticado, redirigir a Login
    return next({ name: 'Login' });
  }
});

export default router;
