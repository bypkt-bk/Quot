import { Prisma, PrismaClient, type QuoteProduct } from "@prisma/client";

class QuoteProductModel {
  private static prisma = new PrismaClient();

  public async getAllQuoteProducts(): Promise<QuoteProduct[]> {
    return await QuoteProductModel.prisma.quoteProduct.findMany({
      include: {
        quote: true,
        product: true,
      },
    });
  }

  public async getQuoteProductById(id: string): Promise<QuoteProduct | null> {
    return await QuoteProductModel.prisma.quoteProduct.findUnique({
      where: { id },
      include: {
        quote: true,
        product: true,
      },
    });
  }

  public async createQuoteProduct(
    quoteId: string,
    productId: string,
    unitPrice: number,
    productName: string,
  ): Promise<QuoteProduct> {
    return await QuoteProductModel.prisma.quoteProduct.create({
      data: {
        quoteId,
        productId,
        quantity: 1,
        unitPrice,
        productName,
      },
    });
  }

  public async updateQuoteProduct(
    id: string,
    data: {
      quantity?: number;
      price?: number;
      unitPrice?: number;
      productName?: string;
    },
  ): Promise<QuoteProduct> {
    return await QuoteProductModel.prisma.quoteProduct.update({
      where: { id },
      data,
    });
  }

  public async deleteQuoteProductById(id: string): Promise<QuoteProduct> {
    return await QuoteProductModel.prisma.quoteProduct.delete({
      where: { id },
      include: {
        quote: true,
        product: true,
      },
    });
  }

  public async deleteQuoteProduct(
    productId: string,
    quoteId: string,
  ): Promise<Prisma.BatchPayload> {
    return await QuoteProductModel.prisma.quoteProduct.deleteMany({
      where: {
        productId,
        quoteId,
      },
    });
  }
}

export const quoteProductModel = new QuoteProductModel();