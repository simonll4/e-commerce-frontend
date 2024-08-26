
// src/stores/product.store.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { type Product } from '@/types/product';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = 'Token de autenticación no encontrado';
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });


        this.products = response.data.map((product: Product) => ({
          ...product,
          imageData: `data:${product.imageType};base64,${product.imageData}`, // Formateo de la imagen base64
        }));
      } catch (error) {
        this.error = 'Error al cargar los productos';
        console.error('Error al cargar los productos:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct(product: Product, image: File | null) {
      const authStore = useAuthStore();
      const token = authStore.token;



      if (!token) {
        throw new Error('Token de autenticación no encontrado');
      }

      const formData = new FormData();
      formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
      if (image) {
        formData.append('imageFile', image);
      }

      try {
        console.log(' en add product Token:', token);
        console.log(' en add product:', product);
        const response = await axios.post('http://localhost:8080/api/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        const addedProduct = {
          ...response.data,
          imageData: `data:${response.data.imageType};base64,${response.data.imageData}`,
        };
        this.products.push(addedProduct);
      } catch (error) {
        this.error = 'Error al agregar el producto';
        console.error('Error al agregar el producto:', error);
        throw error;
      }

    },
    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = 'Token de autenticación no encontrado';
        this.isLoading = false;
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.products = this.products.filter(p => p.id !== Number(productId));
      } catch (error) {
        this.error = 'Error al eliminar el producto';
        console.error('Error al eliminar el producto:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }, 
    async updateProduct(productId: string, updatedProduct: Partial<Product>, image: File | null) {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        throw new Error('Token de autenticación no encontrado');
      }

      const formData = new FormData();
      formData.append('product', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));
      if (image) {
        formData.append('imageFile', image);
      }

      console.log('Tokensssssssssssssss:', token);
      console.log('Productssssssssssssssss:', updatedProduct);

      try {
        const response = await axios.post(`http://localhost:8080/api/product/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        const index = this.products.findIndex(p => p.id === Number(productId));
        if (index !== -1) {
          this.products[index] = {
            ...response.data,
            imageData: `data:${response.data.imageType};base64,${response.data.imageData}`,
          };
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
        console.error('Error al actualizar el producto:', error);
        throw error;
      }
    },
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get<Product>(`http://localhost:8080/api/product/${productId}`);
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error al cargar el producto';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

  },
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => p.id === Number(id));
    },
  },
});





// // src/stores/product.store.ts
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { useAuthStore } from '@/stores/auth.store';
// import { type Product } from '@/types/product';

// export const useProductStore = defineStore('productStore', {
//   state: () => ({
//     products: [] as Product[],
//     isLoading: false,
//     error: null as string | null,
//   }),

//   actions: {
//     async fetchProducts() {
//       this.isLoading = true;
//       this.error = null;

//       const authStore = useAuthStore();
//       const token = authStore.token; 

//       if (!token) {
//         this.error = 'Token de autenticación no encontrado';
//         this.isLoading = false;
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:8080/api/products', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         this.products = response.data;
//       } catch (error) {
//         this.error = 'Error al cargar los productos';
//         console.error('Error al cargar los productos:', error);
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async addProduct(product: Product, image: File | null) {
//       const authStore = useAuthStore();
//       const token = authStore.token; 

//       if (!token) {
//         throw new Error('Token de autenticación no encontrado');
//       }

//       const formData = new FormData();
//       formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
//       if (image) {
//         formData.append('imageFile', image);
//       }

//       try {
//         const response = await axios.post('http://localhost:8080/api/product', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         this.products.push(response.data);
//       } catch (error) {
//         this.error = 'Error al agregar el producto';
//         console.error('Error al agregar el producto:', error);
//         throw error;
//       }
//     },
//   },
// });







// // src/stores/product.store.ts
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { useAuthStore } from '@/stores/auth.store';
// import { type Product } from '@/types/product';

// export const useProductStore = defineStore('productStore', {
//   state: () => ({
//     products: [] as Product[],
//     error: null as string | null,
//   }),

//   actions: {
//     async addProduct(product: Product, image: File | null) {
//       const authStore = useAuthStore();
//       const token = authStore.token; 

//       console.log('Token:', token);

//       if (!token) {
//         throw new Error('Token de autenticación no encontrado');
//       }

//       const formData = new FormData();
//       formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
//       if (image) {
//         formData.append('imageFile', image);
//       }

//       try {
//         const response = await axios.post('http://localhost:8080/api/product', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         this.products.push(response.data);
//       } catch (error) {
//         this.error = 'Error al agregar el producto';
//         console.error('Error al agregar el producto:', error);
//         throw error;
//       }
//     },
//   },
// });
