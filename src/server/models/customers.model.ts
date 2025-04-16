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
  async getCustomerByStoreIdAndPhone(storeId: string, phoneNumber: string) {
    return await prisma.customer.findFirst({
      where: {
        storeId,
        phoneNumber,
      },
      include: {
        quotes: true,
        store: true,
      },
    });
  },

  async createCustomer(
    storeId: string,
    data: {
      name: string;
      phoneNumber: string;
      address: string;
      taxId: string;
    },
  ) {
    return await prisma.customer.create({
      data: {
        ...data,
        storeId,
      },
    });
  },

  async updateCustomer(
    id: string,
    data: {
      name?: string | null;
      address?: string | null;
      phoneNumber: string;
      taxId?: string | null;
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
