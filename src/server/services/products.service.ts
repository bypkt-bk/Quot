import type { IProductRepository } from "../domain/interfaces/repositories/product.repository";

export class ProductsService {
  private productsModel: IProductRepository;
  constructor(productsModel: IProductRepository) {
    this.productsModel = productsModel;
  }
  async getStoreProducts(storeId: string) {
    return await this.productsModel.getProductsByStoreId(storeId);
  }

  async createProduct(storeId: string, name: string, price: number) {
    return await this.productsModel.createProduct(storeId, {
      name,
      price,
    });
  }

  async updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
    },
  ) {
    return await this.productsModel.updateProduct(id, data);
  }

  async deleteProduct(id: string) {
    return await this.productsModel.deleteProduct(id);
  }
};
