import { Store } from "../../domain/entities/store.entity";
import type { IStoreRepository } from "../../domain/interfaces/repositories/store.repository";
import { PrismaClient } from "@prisma/client";

export class StoreRepository implements IStoreRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  updateStoreOwner(id: string, newOwnerIds: string[]): Promise<Store | null> {
    throw new Error("Method not implemented.");
  }
  deleteStore(id: string): Promise<Store | null> {
    throw new Error("Method not implemented.");
  }

  public async getStoreById(id: string): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
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

    if (!store) return null;

    return new Store(store.id, store.name, store.address, store.revenue);
  }
  public async getAllStores(): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });
    return stores.map((store) => {
      return new Store(store.id, store.name, store.address, store.revenue);
    });
  }
  public async createStore(
    name: string,
    address: string,
    ownerIds: string[],
    revenue?: number,
    adminIds?: string[],
  ): Promise<Store | null> {
    const store = await this.prisma.store.create({
      data: {
        name,
        address,
        revenue: revenue || 0,
        owner: {
          connect: ownerIds.map((id) => ({ id })),
        },
        admin: {
          connect: adminIds?.map((id) => ({ id })),
        },
      },
    });

    return new Store(store.id, store.name, store.address, store.revenue);
  }
  public async getStoreByOwnerId(userId: string): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
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

    return stores.map((store) => {
      return new Store(store.id, store.name, store.address, store.revenue);
    });
  }
  public async updateStore(
    id: string,
    data: {
      name?: string;
      address?: string;
      revenue?: number;
    },
  ): Promise<Store | null> {
    const store = await this.prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue,
      },
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });

    if (!store) return null;

    return new Store(store.id, store.name, store.address, store.revenue);
  }
}
