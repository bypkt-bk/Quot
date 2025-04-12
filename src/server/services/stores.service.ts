import { storeModel } from "../models/stores.model";

export const storesService = {
  async getStores() {
    return await storeModel.getAllStores(); 
  },

  async getStoreById(id: number) {
    return await storeModel.getStoreById(id);
  },

  async createStore(
    name: string,
    address: string,
    ownerIds: number[],
    revenue?: number,
    adminIds?: number[]
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
    id: number,
    data: { 
      name?: string,
      address?: string,
      revenue?: number
    }
  ) {
    return await storeModel.updateStore(id, data);
  },

  async updateStoreOwner(id: number, newOwnerIds: number[]) {
    return await storeModel.updateStoreOwner(id, newOwnerIds);
  },

  async deleteStore(id: number) {
    return await storeModel.deleteStore(id);
  },

  async getStoreProducts(storeId: number) {
    return await storeModel.getStoreProducts(storeId);
  },

  async getStoreCustomers(storeId: number) {
    return await storeModel.getStoreCustomers(storeId);
  },

  async getStoreQuotes(storeId: number) {
    return await storeModel.getStoreQuotes(storeId);
  }
};