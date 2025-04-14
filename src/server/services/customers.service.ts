import { customersModel } from "../models/customers.model";

export const customersService = {
  async getStoreCustomers(storeId: string) {
    return await customersModel.getCustomersByStoreId(storeId);
  },

  async getCustomer(id: string) {
    return await customersModel.getCustomerById(id);
  },
  async getCustomerByStoreIdAndPhone(storeId: string, phoneNumber: string) {
    return await customersModel.getCustomerByStoreIdAndPhone(
      storeId,
      phoneNumber,
    );
  },

  async createCustomer(
    storeId: string,
    name: string,
    phoneNumber: string,
    address: string,
    taxId: string,
  ) {
    return await customersModel.createCustomer(storeId, {
      name,
      phoneNumber,
      address,
      taxId,
    });
  },

  async updateCustomer(
    id: string,
    data: {
      name?: string;
      address?: string;
      phoneNumber?: string;
      taxId?: string;
    },
  ) {
    return await customersModel.updateCustomer(id, data);
  },

  async deleteCustomer(id: string) {
    return await customersModel.deleteCustomer(id);
  },
};
