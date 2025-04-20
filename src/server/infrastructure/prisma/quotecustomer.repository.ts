import { QuoteCustomer } from "@/server/domain/entities/quotecustomer.entity";
import type { IQuoteCustomerRepository } from "@/server/domain/interfaces/repositories/quotecustomer.repository";
import { PrismaClient } from "@prisma/client";

export class QuoteCustomerRepository implements IQuoteCustomerRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  public async createQuoteCustomer(
    quoteId: string,
    data: {
      customerId: string;
      name?: string | null;
      taxId?: string | null;
      phoneNumber: string;
      address?: string | null;
    },
  ): Promise<QuoteCustomer> {
    const quoteCustomer = await this.prisma.quoteCustomer.create({
      data: {
        quoteId,
        customerId: data.customerId,
        name: data.name,
        taxId: data.taxId,
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
    });
    return new QuoteCustomer(
      quoteCustomer.id,
      quoteCustomer.customerId,
      quoteCustomer.name ?? "",
      quoteCustomer.taxId ?? "",
      quoteCustomer.phoneNumber,
      quoteCustomer.address ?? "",
    );
  }
  public async updateQuoteCustomer(
    id: string,
    data: {
      customerId?: string;
      name?: string | null;
      taxId?: string | null;
      phoneNumber?: string;
      address?: string | null;
    },
  ): Promise<QuoteCustomer | null> {
    const quoteCustomer = await this.prisma.quoteCustomer.update({
      where: { id },
      data,
    });
    if (!quoteCustomer) return null;
    return new QuoteCustomer(
      quoteCustomer.id,
      quoteCustomer.customerId,
      quoteCustomer.name ?? "",
      quoteCustomer.taxId ?? "",
      quoteCustomer.phoneNumber,
      quoteCustomer.address ?? "",
    );
  }
}
