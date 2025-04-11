import { productsModel } from "../models/products.model";

export const productsService = {
  async getProducts() {
    return await productsModel.getProducts();
  },
  async getProductById(id: number) {
    return await productsModel.getProductById(id);
  },
  async createProduct(name: string, price: number) {
    return await productsModel.createProduct(name, price);
  },
  async updateProduct(id: number, name?: string, price?: number) {
    return await productsModel.updateProduct(id, name, price);
  },
  async deleteProduct(id: number) {
    return await productsModel.deleteProduct(id);
  },
};
