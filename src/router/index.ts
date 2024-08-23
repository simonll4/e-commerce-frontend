import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue';
import AddProductView from '../views/AddProductView.vue';
import EditProductView from '../views/EditProductView.vue'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView,
      props: true 
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: AddProductView
    },
    {
      path: '/edit-product/:id',
      name: 'EditProduct',
      component: EditProductView,
      props: true 
    }
  ]
})

export default router
