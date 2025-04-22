import type { ICustomerRepository } from "../domain/interfaces/repositories/customer.repository";

export class CustomersService {
  private customersModel: ICustomerRepository;
  constructor(customersModel: ICustomerRepository) {
    this.customersModel = customersModel;
  }
  async getStoreCustomers(storeId: string) {
    return await this.customersModel.getCustomersByStoreId(storeId);
  }
  async getCustomerByStoreIdAndPhone(storeId: string, phoneNumber: string) {
    return await this.customersModel.getCustomerByStoreIdAndPhone(
      storeId,
      phoneNumber,
    );
  }

  async createCustomer(
    storeId: string,
    name: string,
    phoneNumber: string,
    address: string,
    taxId: string,
  ) {
    return await this.customersModel.createCustomer(storeId, {
      name,
      phoneNumber,
      address,
      taxId,
    });
  }

  async updateCustomer(
    id: string,
    data: {
      name?: string | null;
      address?: string | null;
      phoneNumber: string;
      taxId?: string | null;
    },
  ) {
    return await this.customersModel.updateCustomer(id, data);
  }

  async deleteCustomer(id: string) {
    return await this.customersModel.deleteCustomer(id);
  }
}
