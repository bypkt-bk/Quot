import { productsModel } from "../models/products.model";

export const productsService = {
  async getStoreProducts(storeId: number) {
    return await productsModel.getProductsByStoreId(storeId);
  },

  async getProduct(id: number) {
    return await productsModel.getProductById(id);
  },

  async createProduct(
    storeId: number,
    name: string,
    price: number
  ) {
    return await productsModel.createProduct(storeId, {
      name,
      price
    });
  },

  async updateProduct(
    id: number,
    data: {
      name?: string;
      price?: number;
    }
  ) {
    return await productsModel.updateProduct(id, data);
  },

  async deleteProduct(id: number) {
    return await productsModel.deleteProduct(id);
  }
};