import type { Customer } from "../../entities/customer.entity";

export interface ICustomerRepository {
  getCustomersByStoreId(storeId: string): Promise<Customer[]>;
  getCustomerByStoreIdAndPhone(
    storeId: string,
    phoneNumber: string
  ): Promise<Customer | null>;
  createCustomer(
    storeId: string,
    data: {
      name: string;
      phoneNumber: string;
      address: string;
      taxId: string;
    }
  ): Promise<Customer>;
  updateCustomer(
    id: string,
    data: {
      name?: string | null;
      address?: string | null;
      phoneNumber: string;
      taxId?: string | null;
    }
  ): Promise<Customer>;
    deleteCustomer(id: string): Promise<Customer>;
}