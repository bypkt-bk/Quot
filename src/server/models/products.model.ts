import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productsModel = {
  async getProducts() {
    return await prisma.product.findMany();
  },

  async getProductById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  async createProduct(name: string, price: number) {
    return await prisma.product.create({
      data: {
        name,
        price,
      },
    });
  },

  async updateProduct(id: number, name?: string, price?: number) {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
      },
    });
  },
  async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
