import { Product
 } from "@/server/domain/entities/product.entity";
import { type IProductRepository } from "@/server/domain/interfaces/repositories/product.repository";
import { PrismaClient } from "@prisma/client";

export class ProductRepository implements IProductRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getProductsByStoreId(storeId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { storeId },
    });
    return products.map((product) => {
      return new Product(
        product.id,
        product.name,
        product.price,
        product.storeId,
      );
    });
  }
  public async createProduct(
    storeId: string,
    data: {
      name: string;
      price: number;
    },
  ): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        ...data,
        storeId,
      },
    });
    return new Product(
      product.id,
      product.name,
      product.price,
      product.storeId,
    );
  }
  public async updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
    },
  ): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });
    return new Product(
      product.id,
      product.name,
      product.price,
      product.storeId,
    );
  }
  public async deleteProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.delete({
      where: { id },
    });
    return new Product(
      product.id,
      product.name,
      product.price,
      product.storeId,
    );
  }
}