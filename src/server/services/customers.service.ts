import { customersModel } from "../models/customers.model";

export const customersService = {
  async getStoreCustomers(storeId: number) {
    return await customersModel.getCustomersByStoreId(storeId);
  },

  async getCustomer(id: number) {
    return await customersModel.getCustomerById(id);
  },

  async createCustomer(
    storeId: number,
    name: string,
    address: string
  ) {
    return await customersModel.createCustomer(storeId, {
      name,
      address
    });
  },

  async updateCustomer(
    id: number,
    data: {
      name?: string;
      address?: string;
    }
  ) {
    return await customersModel.updateCustomer(id, data);
  },

  async deleteCustomer(id: number) {
    return await customersModel.deleteCustomer(id);
  }
};