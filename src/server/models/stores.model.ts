import { Prisma, PrismaClient, type Store } from "@prisma/client";

const prisma = new PrismaClient();

export const storeModel = {
  async getAllStores() {
    return await prisma.store.findMany({
      include: {
        owner: true,  
        admin: true,   
        quote: true,   
        products: true, 
        customers: true 
      },
    });
  },

  async createStore(data: {
    name: string;
    address: string;
    revenue?: number;
    ownerIds: number[];
    adminIds?: number[];
  }) {
    return await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue || 0,
        owner: {
          connect: data.ownerIds.map(id => ({ id })) 
        },
        admin: {
          connect: data.adminIds?.map(id => ({ id }))
        }
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
        products: true,
        customers: true
      }
    });
  },

  async updateStore(
    id: number,
    data: {
      name?: string;
      address?: string;
      revenue?: number;
    }
  ) {
    return await prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue
      },
    });
  },

  async updateStoreOwner(
    storeId: number,
    newOwnerIds: number[]
  ) {
    return await prisma.store.update({
      where: { id: storeId },
      data: {
        owner: {
          set: newOwnerIds.map(id => ({ id }))
        }
      }
    });
  },

  async deleteStore(id: number) {
    return await prisma.store.delete({
      where: { id },
    });
  },

  async getStoreProducts(storeId: number) {
    return await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });
  },

  async getStoreCustomers(storeId: number) {
    return await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        customers: true
      }
    });
  },

  async getStoreQuotes(storeId: number) {
    return await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        quote: true
      }
    });
  }
};