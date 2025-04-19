import type { Product
 } from "../../entities/product.entity";

export interface IProductRepository {
  getProductsByStoreId(storeId: string): Promise<Product[]>;
  createProduct(
    storeId: string,
    data: {
      name: string;
      price: number;
    },
  ): Promise<Product>;
  updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
    },
  ): Promise<Product>;
  deleteProduct(id: string): Promise<Product>;
}