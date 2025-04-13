import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const customersModel = {
  async getCustomersByStoreId(storeId: string) {
    return await prisma.customer.findMany({
      where: { storeId },
    });
  },

  async getCustomerById(id: string) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        quotes: true,
      },
    });
  },

  async createCustomer(
    id: string,
    storeId: string,
    data: {
      name: string;
      address: string;
    },
  ) {
    return await prisma.customer.create({
      data: {
        ...data,
        id,
        storeId,
      },
    });
  },

  async updateCustomer(
    id: string,
    data: {
      name?: string;
      address?: string;
    },
  ) {
    return await prisma.customer.update({
      where: { id },
      data,
    });
  },

  async deleteCustomer(id: string) {
    return await prisma.customer.delete({
      where: { id },
    });
  },
};
