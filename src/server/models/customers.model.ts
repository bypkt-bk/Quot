import { PrismaClient, type Customer } from "@prisma/client";

class CustomersModel {
  private static prisma = new PrismaClient();

  public async getCustomersByStoreId(storeId: string): Promise<Customer[]> {
    return await CustomersModel.prisma.customer.findMany({
      where: { storeId },
    });
  }

  public async getCustomerById(id: string): Promise<Customer | null> {
    return await CustomersModel.prisma.customer.findUnique({
      where: { id },
      include: {
        quotes: true,
      },
    });
  }

  public async getCustomerByStoreIdAndPhone(
    storeId: string,
    phoneNumber: string,
  ): Promise<Customer | null> {
    return await CustomersModel.prisma.customer.findFirst({
      where: {
        storeId,
        phoneNumber,
      },
      include: {
        quotes: true,
        store: true,
      },
    });
  }

  public async createCustomer(
    storeId: string,
    data: {
      name: string;
      phoneNumber: string;
      address: string;
      taxId: string;
    },
  ): Promise<Customer> {
    return await CustomersModel.prisma.customer.create({
      data: {
        ...data,
        storeId,
      },
    });
  }

  public async updateCustomer(
    id: string,
    data: {
      name?: string | null;
      address?: string | null;
      phoneNumber: string;
      taxId?: string | null;
    },
  ): Promise<Customer> {
    return await CustomersModel.prisma.customer.update({
      where: { id },
      data,
    });
  }

  public async deleteCustomer(id: string): Promise<Customer> {
    return await CustomersModel.prisma.customer.delete({
      where: { id },
    });
  }
}

export const customersModel = new CustomersModel();
