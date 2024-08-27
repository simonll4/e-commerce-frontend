import { defineStore } from 'pinia';
import axios from 'axios';

import { useAuthStore } from '@/stores/auth.store';
import { type Product } from '@/types/product';

// Función auxiliar para obtener los headers de autenticación
function getAuthHeaders() {
  const authStore = useAuthStore();
  const token = authStore.token;

  if (!token) {
    throw new Error('Token de autenticación no encontrado');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Definición del store para gestionar productos
export const useProductStore = defineStore('productStore', {

  // Estado inicial del store
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),

  // Acciones: métodos para modificar el estado o realizar operaciones asíncronas
  actions: {

    //Obtener todos los productos del servidor
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          headers: getAuthHeaders(),
        });

        this.products = response.data;
      } catch (error) {
        this.error = 'Error al cargar los productos';
        console.error('Error al cargar los productos:', error);
      } finally {
        this.isLoading = false; // Finaliza la carga
      }
    },

    // Acción para agregar un nuevo producto
    async addProduct(product: Product) {
      try {
        const response = await axios.post('http://localhost:8080/api/product', product, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        });
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error al agregar el producto';
        console.error('Error al agregar el producto:', error);
        throw error;
      }
    },

    // Acción para eliminar un producto por ID
    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`, {
          //headers: getAuthHeaders(),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${getAuthHeaders().Authorization}`,
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

    // Acción para actualizar un producto por ID
    async updateProduct(productId: string, updatedProduct: Partial<Product>) {
      try {
        const response = await axios.put(`http://localhost:8080/api/product/${productId}`, updatedProduct, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${getAuthHeaders().Authorization}`,
          },
        });
        const index = this.products.findIndex(p => p.id === Number(productId));
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
        console.error('Error al actualizar el producto:', error);
        throw error;
      }
    },

    // Acción para obtener un producto por su ID
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;

      // Comprueba si el producto ya existe en la lista local
      const existingProduct = this.products.find(p => p.id === Number(productId));
      if (existingProduct) {
        this.isLoading = false;
        return existingProduct;
      }

      try {
        const response = await axios.get<Product>(`http://localhost:8080/api/product/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${getAuthHeaders().Authorization}`,
          },
        });
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error al cargar el producto';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  // Getters: métodos para acceder al estado de manera reactiva
  getters: {

    // Obtiene un producto por su ID
    getProductById: (state) => (id: string) => {
      return state.products.find(p => p.id === Number(id));
    },

  },
});

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
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         this.products = response.data; // No es necesario formatear imageURL
//       } catch (error) {
//         this.error = 'Error al cargar los productos';
//         console.error('Error al cargar los productos:', error);
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async addProduct(product: Product) {
//       const authStore = useAuthStore();
//       const token = authStore.token;

//       if (!token) {
//         throw new Error('Token de autenticación no encontrado');
//       }

//       try {
//         const response = await axios.post('http://localhost:8080/api/product', product, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         this.products.push(response.data);
//       } catch (error) {
//         this.error = 'Error al agregar el producto';
//         console.error('Error al agregar el producto:', error);
//         throw error;
//       }
//     },

//     async deleteProduct(productId: string) {
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
//         await axios.delete(`http://localhost:8080/api/products/${productId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         this.products = this.products.filter(p => p.id !== Number(productId));
//       } catch (error) {
//         this.error = 'Error al eliminar el producto';
//         console.error('Error al eliminar el producto:', error);
//         throw error;
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async updateProduct(productId: string, updatedProduct: Partial<Product>) {
//       const authStore = useAuthStore();
//       const token = authStore.token;

//       if (!token) {
//         throw new Error('Token de autenticación no encontrado');
//       }

//       try {
//         const response = await axios.put(`http://localhost:8080/api/product/${productId}`, updatedProduct, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Actualiza el producto en el store
//         const index = this.products.findIndex(p => p.id === Number(productId));
//         if (index !== -1) {
//           this.products[index] = response.data;
//         }
//       } catch (error) {
//         this.error = 'Error al actualizar el producto';
//         console.error('Error al actualizar el producto:', error);
//         throw error;
//       }
//     },

//     async fetchProductById(productId: string) {
//       this.isLoading = true;
//       this.error = null;
//       try {
//         const response = await axios.get<Product>(`http://localhost:8080/api/product/${productId}`);
//         this.products.push(response.data);
//       } catch (error) {
//         this.error = 'Error al cargar el producto';
//         console.error(error);
//       } finally {
//         this.isLoading = false;
//       }
//     },
//   },

//   getters: {
//     getProductById: (state) => (id: string) => {
//       return state.products.find(p => p.id === Number(id));
//     },
//   },
// });