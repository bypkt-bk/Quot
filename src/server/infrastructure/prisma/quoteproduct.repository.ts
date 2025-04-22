import { QuoteProduct } from "@/server/domain/entities/quoteproduct.entity";
import type { IQuoteProductRepository } from "@/server/domain/interfaces/repositories/quoteproduct.repository";
import { PrismaClient } from "@prisma/client";

export class QuoteProductRepository implements IQuoteProductRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public async getQuoteProductById(id: string) {
    const quoteProduct = await this.prisma.quoteProduct.findUnique({
      where: { id },
    });
    if (!quoteProduct) return null;
    return new QuoteProduct(
      quoteProduct.id,
      quoteProduct.quoteId,
      quoteProduct.productId,
      quoteProduct.quantity,
      quoteProduct.unitPrice,
      quoteProduct.productName,
    );
  }
  public async createQuoteProduct(
    quoteId: string,
    data: {
      productId: string;
      quantity: number;
      unitPrice: number;
      productName: string;
    },
  ): Promise<QuoteProduct> {
    const quoteProduct = await this.prisma.quoteProduct.create({
      data: {
        quoteId,
        productId: data.productId,
        unitPrice: data.unitPrice,
        productName: data.productName,
        quantity: data.quantity,
      },
    });
    return new QuoteProduct(
      quoteProduct.id,
      quoteProduct.quoteId,
      quoteProduct.productId,
      quoteProduct.quantity,
      quoteProduct.unitPrice,
      quoteProduct.productName,
    );
  }
  public async updateQuoteProduct(
    id: string,
    data: {
      productId?: string;
      quantity?: number;
      unitPrice?: number;
      productName?: string;
    },
  ): Promise<QuoteProduct | null> {
    const quoteProduct = await this.prisma.quoteProduct.update({
      where: { id },
      data,
    });
    if (!quoteProduct) return null;
    return new QuoteProduct(
      quoteProduct.id,
      quoteProduct.quoteId,
      quoteProduct.productId,
      quoteProduct.quantity,
      quoteProduct.unitPrice,
      quoteProduct.productName,
    );
  }
  public async deleteQuoteProduct(
    quoteId: string,
    productId: string,
  ): Promise<QuoteProduct | null> {
    const quoteProduct = await this.prisma.quoteProduct.findFirst({
      where: {
        productId,
        quoteId,
      },
    });
    if (!quoteProduct) return null;
    await this.prisma.quoteProduct.delete({
      where: { id: quoteProduct.id },
    });
    return new QuoteProduct(
      quoteProduct.id,
      quoteProduct.quoteId,
      quoteProduct.productId,
      quoteProduct.quantity,
      quoteProduct.unitPrice,
      quoteProduct.productName,
    );
  }
}
