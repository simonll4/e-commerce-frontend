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

  // Intentar autenticar si no está autenticado pero hay un token en las cookies
  if (!authStore.isAuthenticated && Cookies.get('token')) {
    const isAuthenticated = await authStore.checkAuth();
    if (!isAuthenticated) {
      if (to.name !== 'Login') {
        return next({ name: 'Login' });
      } else {
        return next();
      }
    }
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    if (to.name !== 'Login') {
      return next({ name: 'Login' });
    } else {
      return next();
    }
  }

  // Si el usuario está autenticado y está intentando acceder a la página de inicio de sesión, redirige al dashboard
  if (to.name === 'Login' && authStore.isAuthenticated) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
