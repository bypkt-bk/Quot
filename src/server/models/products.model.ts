import { PrismaClient, type Product } from "@prisma/client";

class ProductsModel {
  private static prisma = new PrismaClient();

  public async getProductsByStoreId(storeId: string): Promise<Product[]> {
    return await ProductsModel.prisma.product.findMany({
      where: { storeId },
    });
  }

  public async getProductById(id: string): Promise<Product | null> {
    return await ProductsModel.prisma.product.findUnique({
      where: { id },
      include: {
        store: true,
      },
    });
  }

  public async createProduct(
    storeId: string,
    data: {
      name: string;
      price: number;
    },
  ): Promise<Product> {
    return await ProductsModel.prisma.product.create({
      data: {
        ...data,
        storeId,
      },
    });
  }

  public async updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
    },
  ): Promise<Product> {
    return await ProductsModel.prisma.product.update({
      where: { id },
      data,
    });
  }

  public async deleteProduct(id: string): Promise<Product> {
    return await ProductsModel.prisma.product.delete({
      where: { id },
    });
  }
}

export const productsModel = new ProductsModel();
