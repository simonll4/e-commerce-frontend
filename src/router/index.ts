// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import Home from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import AddProductView from '@/views/AddProductView.vue';
import EditProductView from '@/views/EditProductView.vue';
import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/auth/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProductView,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProductView,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verifica si el usuario no está autenticado pero tiene un token almacenado
  if (!authStore.isAuthenticated && Cookies.get('token')) {
    const isAuthenticated = await authStore.checkAuth();
    if (!isAuthenticated) {
      return next({ name: 'login' }); // Si la autenticación falla, redirige al login
    }
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    return next({ name: 'login' });
  } else {
    next(); // Permite la navegación
  }
});

export default router;
