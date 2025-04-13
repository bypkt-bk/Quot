import { customersModel } from "../models/customers.model";

export const customersService = {
  async getStoreCustomers(storeId: string) {
    return await customersModel.getCustomersByStoreId(storeId);
  },

  async getCustomer(id: string) {
    return await customersModel.getCustomerById(id);
  },

  async createCustomer(
    id: string,
    storeId: string,
    name: string,
    address: string,
  ) {
    return await customersModel.createCustomer(id, storeId, {
      name,
      address,
    });
  },

  async updateCustomer(
    id: string,
    data: {
      name?: string;
      address?: string;
    },
  ) {
    return await customersModel.updateCustomer(id, data);
  },

  async deleteCustomer(id: string) {
    return await customersModel.deleteCustomer(id);
  },
};
