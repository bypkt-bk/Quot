import { PrismaClient, type QuoteCustomer } from "@prisma/client";

class QuoteCustomerModel {
  private static prisma = new PrismaClient();

  public async getAll(): Promise<QuoteCustomer[]> {
    return await QuoteCustomerModel.prisma.quoteCustomer.findMany({
      include: {
        quote: true,
        customer: true,
      },
    });
  }

  public async getById(id: string): Promise<QuoteCustomer | null> {
    return await QuoteCustomerModel.prisma.quoteCustomer.findUnique({
      where: { id },
      include: {
        quote: true,
        customer: true,
      },
    });
  }

  public async getByQuoteId(quoteId: string): Promise<QuoteCustomer[]> {
    return await QuoteCustomerModel.prisma.quoteCustomer.findMany({
      where: { quoteId },
      include: {
        customer: true,
      },
    });
  }

  public async create(data: {
    quoteId: string;
    name?: string | null;
    taxId?: string | null;
    phoneNumber: string;
    address?: string | null;
    customerId: string;
  }): Promise<QuoteCustomer> {
    return await QuoteCustomerModel.prisma.quoteCustomer.create({
      data: {
        quote: {
          connect: { id: data.quoteId },
        },
        customer: {
          connect: { id: data.customerId },
        },
        name: data.name,
        taxId: data.taxId,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });
  }

  public async update(
    id: string,
    data: {
      name?: string;
      taxId?: string;
      phoneNumber?: string;
      address?: string;
    },
  ): Promise<QuoteCustomer> {
    return await QuoteCustomerModel.prisma.quoteCustomer.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string): Promise<QuoteCustomer> {
    return await QuoteCustomerModel.prisma.quoteCustomer.delete({
      where: { id },
    });
  }
}

export const quoteCustomerModel = new QuoteCustomerModel();
