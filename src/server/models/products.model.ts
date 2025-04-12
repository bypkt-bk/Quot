import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productsModel = {
  async getProductsByStoreId(storeId: number) {
    return await prisma.product.findMany({
      where: { storeId },
    });
  },

  async getProductById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        store: true
      }
    });
  },

  async createProduct(
    storeId: number, 
    data: {
      name: string;
      price: number;
    }
  ) {
    return await prisma.product.create({
      data: {
        ...data,
        storeId
      },
    });
  },
  async updateProduct(
    id: number, 
    data: {
      name?: string;
      price?: number;
    }
  ) {
    return await prisma.product.update({
      where: { id },
      data
    });
  },

  async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }
};