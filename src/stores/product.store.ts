// src/store/productStore.ts
import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { type Product } from '@/types/product';
import { useAuthStore } from '@/stores/auth.store';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchUserProducts() {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const user = authStore.user;

      if (!user) {
        this.error = 'Usuario no autenticado';
        this.isLoading = false;
        return;
      }

      try {
        const q = query(collection(db, 'products'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        this.products = querySnapshot.docs.map(doc => ({ ...(doc.data() as Product), id: doc.id }));
      } catch (error) {
        console.error(error);
        this.error = 'Error al obtener los productos';
      } finally {
        this.isLoading = false;
      }
    }
    ,async addProduct(product: Product) {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const user = authStore.user;

      if (!user) {
        this.error = 'Usuario no autenticado';
        this.isLoading = false;
        return;
      }

      try {
        const productWithUserId = {
          ...product,
          userId: user.uid,
        };
        console.log('Producto agregado:', productWithUserId); // Agrega un log para verificar el producto
        await addDoc(collection(db, 'products'), productWithUserId);
        this.fetchUserProducts(); // Refrescar la lista de productos después de agregar uno nuevo
      } catch (error) {
        console.error(error);
        this.error = 'Error al agregar el producto';
      } finally {
        this.isLoading = false;
      }
    },

    async updateProduct(product: Product) {
      if (!product.id) return;

      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const userId = authStore.user?.uid; // Obtén el userId del usuario autenticado

      if (!userId) {
        this.error = 'Usuario no autenticado';
        this.isLoading = false;
        return;
      }

      try {
        // Verifica que el producto tenga el mismo userId que el usuario autenticado
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, { ...product } as { [x: string]: any });
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = product;
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;

      try {
        console.log('ID del producto a eliminar:', productId);
        const productDoc = doc(db, 'products', productId);
        await deleteDoc(productDoc);
        this.fetchUserProducts(); // Refrescar la lista de productos después de eliminar uno
      } catch (error) {
        console.error(error);
        this.error = 'Error al eliminar el producto';
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => p.id && p.id.toString() === id);
    },
  },

});


//CON FAKESTOREAPI
// import { defineStore } from 'pinia';
// import axios from 'axios';
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
//       try {
//         const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
//         this.products = response.data;
//       } catch (error) {
//         this.error = 'Error al cargar los productos';
//       } finally {
//         this.isLoading = false;
//       }
//     },
//     async addProduct(product: Product) {
//       try {
//         const response = await axios.post<Product>(`https://fakestoreapi.com/products`, product);
//         this.products.push(response.data);
//       } catch (error) {
//         this.error = 'Error al agregar el producto';
//       }
//     },
//     async updateProduct(product: Product) {
//       try {
//         const response = await axios.put<Product>(`https://fakestoreapi.com/products/${product.id}`, product);
//         const index = this.products.findIndex(p => p.id === product.id);
//         if (index !== -1) {
//           this.products[index] = response.data;
//         }
//         return response.data;
//       } catch (error) {
//         this.error = 'Error al actualizar el producto';
//       }
//     },
//     async deleteProduct(productId: number) {
//       try {
//         const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`);
//         this.products = this.products.filter(p => p.id !== productId);
//         return response.data;
//       } catch (error) {
//         this.error = 'Error al eliminar el producto';
//       }
//     },
//   },

//   getters: {
//     getProductById: (state) => (id: number) => {
//       return state.products.find(p => p.id === id);
//     },
//   },
// });
