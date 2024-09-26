// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/public/HomeView.vue';

const routes = [
  // public routes
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/public/ProductListView.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/public/ProductDetailView.vue'),
  },

  // Auth routes
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue'),
  // }

  // Admin routes
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/DashboardView.vue')
      },
      {
        path: 'profile',
        name: 'ProfileAdmin',
        component: () => import('@/views/admin/ProfileView.vue')
      },
      {
        path: 'products',
        name: 'ProductsAdmin',
        component: () => import('@/views/admin/ProductManagerView.vue')
      },
      {
        path: 'products/:id',
        name: 'ProductDetailAdmin',
        component: () => import('@/views/admin/ProductDetailView.vue')
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/views/admin/CustomerManagerView.vue')
      },
    ],
    meta: { requiresAuth: true, isAdmin: true }
  },

  // Customer Routes
  {
    path: '/customer',
    name: 'Customer',
    children: [
      {
        path: 'profile',
        name: 'ProfileCustomer',
        component: () => import('@/views/customer/ProfileView.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/customer/CartView.vue'),
      },
    ],
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = await authStore.checkAuth();
  if (isAuthenticated) {
    const userRole = authStore.userRole;
    // Si el usuario está autenticado y trata de ir a la ruta de login, redirigir al Home
    if (to.name === 'Login') {
      return next({ name: 'Home' });
    }
    const routeRole = to.meta.isAdmin;
    // Si la ruta requiere un rol y el usuario no tiene el rol adecuado, redirigir
    if (routeRole && routeRole !== userRole) {
      return next({ name: 'Home' }); // Redirige a una página de "No Autorizado"
    }
    return next();
  } 
  // else {
  //   return next({ name: 'Login' });
  // }

  // Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // Si la ruta no requiere autenticación, dejar continuar
  if (!requiresAuth) {
    return next();
  }
});

export default router;
