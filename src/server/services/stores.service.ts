import { storeModel } from "../models/stores.model";

export const storesService = {
    async getStores() {
        return await storeModel.getStores();
    },
    async getStoreById(id: number) {
        return await storeModel.getStoreById(id);
    },
    async createStore(name: string, address: string, revenue: number) {
        return await storeModel.createStore(name, address, revenue);
    },
    async updateStore(
        id: number,
        name?: string,
        address?: string,
        revenue?: number
    ) {
        return await storeModel.updateStore(id, name, address, revenue);
    },
    async deleteStore(id: number) {
        return await storeModel.deleteStore(id);
    },
}