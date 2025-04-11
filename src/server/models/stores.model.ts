import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const storeModel = {
  async getStores() {
    return await prisma.store.findMany({
      include: {
        owner: true,
        admin: true,
        quote: true,
      },
    });
  },

  async getStoreById(id: number) {
    return await prisma.store.findUnique({
      where: { id },
      include: {
        owner: true,
        admin: true,
        quote: true,
      },
    });
  },

  async createStore(name: string, address: string, revenue: number) {
    return await prisma.store.create({
      data: {
        name,
        address,
        revenue,
      },
    });
  },

  async updateStore(
    id: number,
    name?: string,
    address?: string,
    revenue?: number,
  ) {
    return await prisma.store.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(revenue !== undefined && { revenue }),
      },
    });
  },

  async deleteStore(id: number) {
    return await prisma.store.delete({
      where: { id },
    });
  },
};
