import {
  PrismaClient,
  Status,
  PaymentType,
  type QuoteProduct,
  type Quote,
  Prisma,
} from "@prisma/client";

class QuoteModel {
  private static prisma = new PrismaClient();

  public async getQuotes(): Promise<Quote[]> {
    return await QuoteModel.prisma.quote.findMany({
      include: {
        customers: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async getQuoteById(id: string): Promise<Quote | null> {
    return await QuoteModel.prisma.quote.findUnique({
      where: { id },
      include: {
        customers: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async createQuote(
    storeId: string,
    customerId: string,
    products: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[],
    orderDate: string,
    type: PaymentType = PaymentType.cash,
    status: Status = Status.unpaid,
    address?: string,
    shippingOn?: string | null,
    creditTerm?: number,
  ): Promise<Quote> {
    return await QuoteModel.prisma.quote.create({
      data: {
        storeId,
        orderDate,
        address,
        type,
        status,
        shippingOn,
        creditTerm,
        total: this.calculateTotal(products),
        ...(customerId && { customerId }),
        products: {
          create: this.mapProducts(products),
        },
      },
      include: {
        products: true,
      },
    });
  }

  public async updateAddress(id: string, address: string): Promise<Quote> {
    return await QuoteModel.prisma.quote.update({
      where: { id },
      data: { address },
    });
  }

  public async updateQuoteStatus(id: string, status: Status): Promise<Quote> {
    return await QuoteModel.prisma.quote.update({
      where: { id },
      data: { status },
    });
  }

  public async updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ): Promise<Quote> {
    return await QuoteModel.prisma.quote.update({
      where: { id },
      data: { orderDate, shippingOn },
    });
  }

  public async updateTotal(id: string, total: number): Promise<Quote> {
    return await QuoteModel.prisma.quote.update({
      where: { id },
      data: { total },
    });
  }

  public async deleteQuote(id: string): Promise<Quote> {
    return await QuoteModel.prisma.quote.delete({
      where: { id },
    });
  }

  public async updatePaymentType(
    id: string,
    type: PaymentType,
    creditTerm?: number | null,
  ): Promise<Quote> {
    return await QuoteModel.prisma.quote.update({
      where: { id },
      data: { type, creditTerm },
    });
  }

  private calculateTotal(
    products: {
      quantity: number;
      unitPrice: number;
    }[],
  ): number {
    return products.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  }

  private mapProducts(
    products: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[],
  ): Prisma.QuoteProductCreateWithoutQuoteInput[] {
    return products.map((p) => ({
      productId: p.productId,
      quantity: p.quantity,
      productName: p.productId,
      unitPrice: p.unitPrice,
      product: {
        connect: { id: p.productId },
      },
    }));
  }
}

export const quoteModel = new QuoteModel();