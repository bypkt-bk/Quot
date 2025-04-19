import type { IStoreRepository } from "../domain/interfaces/repositories/store.repository";
import { StoreRepository } from "../infrastructure/prisma/store.repository";


export class StoresService {
  private storeRepository: IStoreRepository;
  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }


  async getStoreById(id: string) {
    return await this.storeRepository.getStoreById(id);
  }

  async getStoreByOwnerId(userId: string) {
    return await this.storeRepository.getStoreByOwnerId(userId);
  }

  async createStore(
    name: string,
    address: string,
    ownerIds: string[],
    revenue?: number,
    adminIds?: string[],
  ) {
    return await this.storeRepository.createStore(
      name,
      address,
      ownerIds,
      revenue || 0,
      adminIds,
    );
  }

  async updateStore(
    id: string,
    data: {
      name?: string;
      address?: string;
      revenue?: number;
    },
  ) {
    return await this.storeRepository.updateStore(id, data);
  }
  async updateStoreOwner(id: string, newOwnerIds: number[]) {
    return await this.storeRepository.updateStoreOwner(id, newOwnerIds.map(String));
  }

  async incrementRevenue(storeId: string, revenue: number) {
    const store = await this.storeRepository.getStoreById(storeId);
    if (!store) {
      throw new Error(`Store with ID ${storeId} not found`);
    }
    const updatedRevenue = (store.revenue || 0) + revenue;
    return await this.storeRepository.updateStore(storeId, {
      revenue: updatedRevenue,
    });
    
  }

  async decreaseRevenue(storeId: string, revenue: number) {
    const store = await this.storeRepository.getStoreById(storeId);
    if (!store) {
      throw new Error(`Store with ID ${storeId} not found`);
    }
    const updatedRevenue = (store.revenue || 0) - revenue;
    return await this.storeRepository.updateStore(storeId, {
      revenue: updatedRevenue,
    });
  }
};
