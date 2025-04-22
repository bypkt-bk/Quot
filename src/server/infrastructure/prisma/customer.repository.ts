import { Customer } from "@/server/domain/entities/customer.entity";
import type { ICustomerRepository } from "@/server/domain/interfaces/repositories/customer.repository";
import { PrismaClient } from "@prisma/client";

export class CustomerRepository implements ICustomerRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCustomersByStoreId(storeId: string): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      where: { storeId },
    });

    return customers.map((customer) => {
      return new Customer(
        customer.id,
        customer.name ?? "",
        customer.phoneNumber,
        customer.address,
        customer.taxId,
        customer.storeId,
      );
    });
  }
  public async getCustomerByStoreIdAndPhone(
    storeId: string,
    phoneNumber: string,
  ): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        storeId,
        phoneNumber,
      },
      include: {
        quotes: true,
        store: true,
      },
    });

    if (!customer) return null;

    return new Customer(
      customer.id,
      customer.name ?? "",
      customer.phoneNumber,
      customer.address,
      customer.taxId,
      customer.storeId,
    );
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
    const customer = await this.prisma.customer.create({
      data: {
        ...data,
        storeId,
      },
    });

    return new Customer(
      customer.id,
      customer.name ?? "",
      customer.phoneNumber,
      customer.address,
      customer.taxId,
      customer.storeId,
    );
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
    const customer = await this.prisma.customer.update({
      where: { id },
      data,
    });

    return new Customer(
      customer.id,
      customer.name ?? "",
      customer.phoneNumber,
      customer.address,
      customer.taxId,
      customer.storeId,
    );
  }
  public async deleteCustomer(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.delete({
      where: { id },
    });

    return new Customer(
      customer.id,
      customer.name ?? "",
      customer.phoneNumber,
      customer.address,
      customer.taxId,
      customer.storeId,
    );
  }
}
