import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const quoteproduct = {
  async getAllQuoteProducts() {
    return await prisma.quoteProduct.findMany({
      include: {
        quote: true,
        product: true,
      },
    });
  },

  async getQuoteProductById(id: string) {
    return await prisma.quoteProduct.findUnique({
      where: { id },
      include: {
        quote: true,
        product: true,
      },
    });
  },

  async createQuoteProduct(quoteId: string, productId: string) {
    return await prisma.quoteProduct.create({
      data: {
        quoteId,
        productId,
        quantity: 1, // Default value for quantity
      },
    });
  },

  async updateQuoteProduct(
    id: string,
    data: {
      quantity?: number;
      price?: number;
    },
  ) {
    return await prisma.quoteProduct.update({
      where: { id },
      data,
    });
  },

  async deleteQuoteProductById(id: string) {
    return await prisma.quoteProduct.delete({
      where: { id },
      include: {
        quote: true,
        product: true,
      },
    });
  },
  async deleteQuoteProduct(productId: string, quoteId: string) {
    return await prisma.quoteProduct.deleteMany({
      where: {
        productId,
        quoteId,
      },
    });
  },
};
