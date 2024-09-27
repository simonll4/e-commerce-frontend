// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/public/HomeView.vue';
import Dashboard from '@/views/admin/DashboardView.vue';

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/public/NotFoundView.vue'),
  },

  // Admin routes
  {
    path: '/admin',
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
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
  const refreshToken = Cookies.get('refresh_token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const isAuthenticated = await authStore.checkAuth();
    if (!isAuthenticated) {
      return next({ name: 'Login' });
    }

    const userRole = authStore.userRole; 
    const isAdminRoute = to.matched.some(record => record.meta.isAdmin);

    if (userRole && to.path === '/') {
      return next({ name: 'Dashboard' });
    } else if (!userRole && isAdminRoute) {
      return next({ name: 'Home' });
    }
    return next();
  }

  if (!requiresAuth && refreshToken) {
    await authStore.checkAuth();
    return next();
  }
  return next(); 
});

export default router;