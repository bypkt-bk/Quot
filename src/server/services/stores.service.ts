import { storeModel } from "../models/stores.model";

export const storesService = {
  async getStores() {
    return await storeModel.getAllStores(); 
  },

  async getStoreById(id: string) {
    return await storeModel.getStoreById(id);
  },

  async createStore(
    name: string,
    address: string,
    ownerIds: string[],
    revenue?: number,
    adminIds?: string[]
  ) {
    return await storeModel.createStore({
      name,
      address,
      revenue: revenue || 0,
      ownerIds,
      adminIds
    });
  },

  async updateStore(
    id: string,
    data: { 
      name?: string,
      address?: string,
      revenue?: number
    }
  ) {
    return await storeModel.updateStore(id, data);
  },

  async updateStoreOwner(id: string, newOwnerIds: number[]) {
    return await storeModel.updateStoreOwner(id, newOwnerIds);
  },

  async deleteStore(id: string) {
    return await storeModel.deleteStore(id);
  },

  async getStoreProducts(storeId: string) {
    return await storeModel.getStoreProducts(storeId);
  },

  async getStoreCustomers(storeId: string) {
    return await storeModel.getStoreCustomers(storeId);
  },

  async getStoreQuotes(storeId: string) {
    return await storeModel.getStoreQuotes(storeId);
  }
};