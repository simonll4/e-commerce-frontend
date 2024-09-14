import { defineStore } from 'pinia';
import { CreateProduct, FilterProduct, UpdateProduct, type Product } from '@/types/product';
import ProductServices from '@/services/product.services';


const service = new ProductServices();

export const useProductStore = defineStore('productStore', {

  // Estado inicial del store
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
    filteredProducts: {
      totalItems: 0,
      totalPages: 0,
      offset: 0,
      limit: 5,
      sortBy: '',
      sortDirection: '',
    } as FilterProduct
  }),

  actions: {

    async fetchProducts() {
      if ((this.filteredProducts?.totalItems ?? 0) !== 0 && (this.filteredProducts?.offset ?? 0) >= (this.filteredProducts?.totalItems ?? 0)) return;

      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.getProducts(this.filteredProducts);
        console.log("asdasdas ", response.data)

        this.filteredProducts.offset = response.data.pagination.offset;

        // if (page === 1) {
        //   this.products = response.data.data; // Si es la primera página, sobrescribe los productos
        // } else {
        //   this.products = [...this.products, ...response.data.data]; // Si es una página subsiguiente, agrega los productos
        // }

        const response1 = await service.getProducts(this.filteredProducts);
        console.log("asdasdas ", response1.data)

      } catch (error) {
        this.error = 'Error al cargar los productos';
        console.error('Error al cargar los productos:', error);
      } finally {
        this.isLoading = false;
      }
    },

    //   // Acción para obtener un producto por su ID
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await service.getProductById(productId);
        console.log("soy uno ", response.data);
      } catch (error) {
        this.error = 'Error al cargar el producto';
        console.error('Error al cargar el producto:', error);
      } finally {
        this.isLoading = false;
      }
    }
    ,
    async createProduct(createdProduct: CreateProduct) {
      try {
        const response = await service.createProduct(createdProduct);
        console.log("soy agregado ", response.data);
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
        const response = await service.deleteProduct(productId);
        console.log("soy eliminado ", response.data);
      } catch (error) {
        this.error = 'Error al eliminar el producto';
        console.error('Error al eliminar el producto:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProduct(productId: string, updatedProduct: UpdateProduct) {
      try {
        const response = await service.updateProduct(productId, updatedProduct);
        console.log("soy actualizado ", response.data);
      } catch (error) {
        this.error = 'Error al actualizar el producto';
        console.error('Error al actualizar el producto:', error);
        throw error;
      }
    },
  },

  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => String(p.id) === id);
    },
  },
});