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
    address?: string,
    shippingOn?: string,
  ) {
    return await prisma.quote.create({
      data: {
        storeId,
        orderDate,
        address,
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
  async updateAddress(id: string, address: string) {
    return await prisma.quote.update({
      where: { id },
      data: { address },
    });
  },
  async updateQuoteStatus(id: string, status: Status) {
    return await prisma.quote.update({
      where: { id },
      data: { status },
    });
  },
  async updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ) {
    return await prisma.quote.update({
      where: { id },
      data: { orderDate, shippingOn },
    });
  },
  async updateTotal(id: string, total: number) {
    return await prisma.quote.update({
      where: { id },
      data: { total },
    });
  },
  async deleteQuote(id: string) {
    return await prisma.quote.delete({
      where: { id },
    });
  },
};
