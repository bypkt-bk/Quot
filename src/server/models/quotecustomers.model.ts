import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const quoteCustomerModel = {
  async getAll() {
    return await prisma.quoteCustomer.findMany({
      include: {
        quote: true,
        customer: true,
      },
    });
  },

  async getById(id: string) {
    return await prisma.quoteCustomer.findUnique({
      where: { id },
      include: {
        quote: true,
        customer: true,
      },
    });
  },

  async getByQuoteId(quoteId: string) {
    return await prisma.quoteCustomer.findMany({
      where: { quoteId },
      include: {
        customer: true,
      },
    });
  },

  async create(data: {
    quoteId: string;
    name?: string;
    taxId?: string;
    phoneNumber: string;
    address?: string;
    customerId: string;
  }) {
    return await prisma.quoteCustomer.create({
      data: {
        quote: {
          connect: { id: data.quoteId },
        },
        customer: {
          connect: { id: data.customerId },
        },
        name: data.name,
        taxId: data.taxId,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });
  },

  async update(
    id: string,
    data: {
      name?: string;
      taxId?: string;
      phoneNumber?: string;
      address?: string;
    },
  ) {
    return await prisma.quoteCustomer.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.quoteCustomer.delete({
      where: { id },
    });
  },
};
