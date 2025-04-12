import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const customersModel = {
  async getCustomersByStoreId(storeId: number) {
    return await prisma.customer.findMany({
      where: { storeId },
    });
  },

  async getCustomerById(id: number) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        quotes: true 
      }
    });
  },

  async createCustomer(
    storeId: number,
    data: {
      name: string;
      address: string;
    }
  ) {
    return await prisma.customer.create({
      data: {
        ...data,
        storeId
      },
    });
  },

  async updateCustomer(
    id: number,
    data: {
      name?: string;
      address?: string;
    }
  ) {
    return await prisma.customer.update({
      where: { id },
      data
    });
  },

  async deleteCustomer(id: number) {
    return await prisma.customer.delete({
      where: { id },
    });
  }
};