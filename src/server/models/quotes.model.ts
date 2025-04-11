import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export const quoteModel = {
  async getQuotes() {
    return await prisma.quote.findMany({
      include: {
        customer: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  async getQuoteById(id: number) {
    return await prisma.quote.findUnique({
      where: { id },
      include: {
        customer: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  async createQuote(
    total: number,
    orderDate: string,
    customerId: number,
    storeId: number,
    status: Status,
    shippingOn?: string,
  ) {
    return await prisma.quote.create({
      data: {
        total,
        orderDate,
        status,
        customerId,
        storeId,
        ...(shippingOn && { shippingOn }),
      },
    });
  },

  async updateQuote(
    id: number,
    data: {
      total?: number;
      orderDate?: string;
      shippingOn?: string;
      status?: Status;
    },
  ) {
    return await prisma.quote.update({
      where: { id },
      data,
    });
  },

  async deleteQuote(id: number) {
    return await prisma.quote.delete({
      where: { id },
    });
  },
};
