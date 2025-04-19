import { PaymentType, PrismaClient, Status, type Store } from "@prisma/client";

class StoreModel {
  private static prisma = new PrismaClient();

  public async getAllStores(): Promise<Store[]> {
    return await StoreModel.prisma.store.findMany({
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });
  }

  public async createStore(data: {
    name: string;
    address: string;
    revenue?: number;
    ownerIds: string[];
    adminIds?: string[];
  }): Promise<Store> {
    return await StoreModel.prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue || 0,
        owner: {
          connect: data.ownerIds.map((id) => ({ id })),
        },
        admin: {
          connect: data.adminIds?.map((id) => ({ id })),
        },
      },
    });
  }

  public async getStoreById(id: string): Promise<Store | null> {
    return await StoreModel.prisma.store.findUnique({
      where: { id },
      include: {
        owner: true,
        admin: true,
        quote: {
          include: {
            customers: true,
          },
        },
        products: true,
        customers: true,
      },
    });
  }

  public async getStoreByOwnerId(userId: string): Promise<Store[]> {
    return await StoreModel.prisma.store.findMany({
      where: {
        owner: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });
  }

  public async updateStore(
    id: string,
    data: {
      name?: string;
      address?: string;
      revenue?: number;
    },
  ): Promise<Store> {
    return await StoreModel.prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue,
      },
    });
  }

  public async updateStoreOwner(
    storeId: string,
    newOwnerIds: number[],
  ): Promise<Store> {
    return await StoreModel.prisma.store.update({
      where: { id: storeId },
      data: {
        owner: {
          set: newOwnerIds.map((id) => ({ id: id.toString() })),
        },
      },
    });
  }

  public async deleteStore(id: string): Promise<Store> {
    return await StoreModel.prisma.store.delete({
      where: { id },
    });
  }

  public async getStoreProducts(storeId: string): Promise<Store | null> {
    return await StoreModel.prisma.store.findUnique({
      where: { id: storeId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
  }

  public async getStoreCustomers(storeId: string): Promise<{ customers: { name: string | null; id: string; address: string | null; taxId: string | null; phoneNumber: string; storeId: string; }[] } | null> {
    return await StoreModel.prisma.store.findUnique({
      where: { id: storeId },
      select: {
        customers: {
          select: {
            name: true,
            id: true,
            address: true,
            taxId: true,
            phoneNumber: true,
            storeId: true,
          },
        },
      },
    });
  }

  public async getStoreQuotes(storeId: string): Promise<{ quote: { id: string; address: string | null; storeId: string; total: number; orderDate: string; shippingOn: string | null; type: PaymentType; creditTerm: number | null; status: Status; customerId: string | null; }[] } | null> {
    return await StoreModel.prisma.store.findUnique({
      where: { id: storeId },
      select: {
        quote: true,
      },
    });
  }

  public async incrementRevenue(
    storeId: string,
    amount: number,
  ): Promise<Store> {
    return await StoreModel.prisma.store.update({
      where: { id: storeId },
      data: {
        revenue: {
          increment: amount,
        },
      },
    });
  }

  public async decreaseRevenue(
    storeId: string,
    amount: number,
  ): Promise<Store> {
    return await StoreModel.prisma.store.update({
      where: { id: storeId },
      data: {
        revenue: {
          decrement: amount,
        },
      },
    });
  }
}

export const storeModel = new StoreModel();