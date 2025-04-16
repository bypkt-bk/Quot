import { productsModel } from "../models/products.model";

export const productsService = {
  async getStoreProducts(storeId: string) {
    return await productsModel.getProductsByStoreId(storeId);
  },

  async getProduct(id: string) {
    return await productsModel.getProductById(id);
  },

  async createProduct(storeId: string, name: string, price: number) {
    return await productsModel.createProduct(storeId, {
      name,
      price,
    });
  },

  async updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
    },
  ) {
    return await productsModel.updateProduct(id, data);
  },

  async deleteProduct(id: string) {
    return await productsModel.deleteProduct(id);
  },
};
