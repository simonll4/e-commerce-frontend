// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/stores/auth.store';
import LoginView from '@/views/auth/LoginView.vue';
import AdminDashboard from '@/views/admin/DashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/customer/HomeView.vue'),
  },

  // Auth routes
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
  },

  // Admin routes
  {
    path: '/admin',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/DashboardView.vue')
      },
      {
        path: '/profile',
        name: 'ProfileAdmin',
        component: () => import('@/views/admin/ProfileView.vue')
      },
      {
        path: '/products',
        name: 'ProductsAdmin',
        component: () => import('@/views/admin/ProductManagerView.vue')
      },
      {
        path: '/products/:id',
        name: 'ProductDetailAdmin',
        component: () => import('@/views/admin/ProductDetailView.vue')
      },
      {
        path: '/customers',
        name: 'Customers',
        component: () => import('@/views/admin/CustomerManagerView.vue')
      },
    ],
    meta: { requiresAuth: true, isAdmin: true }
  },

  // Customer Routes
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/customer/ProductListView.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/customer/ProductDetailView.vue'),
  },
  {
    path: '/customer',
    name: 'Customer',
    children:[
        {
          path: '/profile',
          name: 'ProfileCustomer',
          component: () => import('@/views/customer/ProfileView.vue'),
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('@/views/customer/CartView.vue'),
        },
    ],
    meta: { requiresAuth: true }
  },
  
  // ,
  // {
  //   path: '/product/:id',
  //   name: 'ProductDetail',
  //   component: () => import('@/views/ProductDetailView.vue'),
  //   props: true,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/add-product',
  //   name: 'AddProduct',
  //   component: () => import('@/views/AddProductView.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/edit-product/:id',
  //   name: 'EditProduct',
  //   component: () => import('@/views/EditProductView.vue'),
  //   props: true,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue'),
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();

//   // Verificar si la ruta requiere autenticación
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   // Si la ruta no requiere autenticación, dejar continuar
//   if (!requiresAuth) {
//     return next();
//   }

//   // Si la ruta requiere autenticación, verificar si el usuario está autenticado
//   const isAuthenticated = await authStore.checkAuth();

//   if (isAuthenticated) {
//     // Si está autenticado y trata de ir a login, redirigir al Home
//     if (to.name === 'Login') {
//       return next({ name: 'Home' });
//     }
//     return next(); // Permitir acceso a rutas protegidas si está autenticado
//   } else {
//     // Si no está autenticado, redirigir a Login
//     return next({ name: 'Login' });
//   }
// });

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Si la ruta no requiere autenticación, dejar continuar
  if (!requiresAuth) {
    return next();
  }

  // Verificar si el usuario está autenticado
  const isAuthenticated = await authStore.checkAuth();

  if (isAuthenticated) {
    // Obtener el rol del usuario desde el store
    const userRole = authStore.userRole; // Asumimos que authStore tiene el rol almacenado

    // Si el usuario está autenticado y trata de ir a la ruta de login, redirigir al Home
    if (to.name === 'Login') {
      return next({ name: 'Home' });
    }

    // Verificar si la ruta requiere un rol específico
    const routeRole = to.meta.isAdmin; // Accedemos al rol que requiere la ruta

    // Si la ruta requiere un rol y el usuario no tiene el rol adecuado, redirigir
    if (routeRole && routeRole !== userRole) {
      return next({ name: 'Home' }); // Redirige a una página de "No Autorizado"
    }

    // Si está autenticado y tiene el rol correcto, dejarlo pasar
    return next();
  } else {
    // Si no está autenticado, redirigir a Login
    return next({ name: 'Login' });
  }
});

export default router;
