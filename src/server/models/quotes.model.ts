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

  async getQuoteById(id: string) {
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
    storeId: string,
    customerId: string,
    products: Array<{ productId: string; quantity: number }>,
    orderDate: string,
    status: Status = Status.unpaid,
    shippingOn?: string,
  ) {
    return await prisma.quote.create({
      data: {
        storeId,
        orderDate,
        status,
        shippingOn,
        total: products.reduce((sum, p) => sum + p.quantity * 100, 0),
        ...(customerId && { customerId }),
        products: {
          create: products.map((p) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
  },

  async updateQuoteStatus(id: string, status: Status) {
    return await prisma.quote.update({
      where: { id },
      data: { status },
    });
  },

  async deleteQuote(id: string) {
    return await prisma.quote.delete({
      where: { id },
    });
  },
};
