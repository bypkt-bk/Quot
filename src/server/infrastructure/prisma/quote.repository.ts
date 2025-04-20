
import { Quote
 } from "@/server/domain/entities/quote.entity";
import type { PaymentType } from "@/server/domain/enums/payment-type.enum";
import type { Status } from "@/server/domain/enums/status.enum";
import type { IQuoteRepository } from "@/server/domain/interfaces/repositories/quote.repository";
import { PrismaClient } from "@prisma/client";
import { QuoteProduct } from "@/server/domain/entities/quoteproduct.entity";
import { Store } from "@/server/domain/entities/store.entity";
import { QuoteCustomer } from "@/server/domain/entities/quotecustomer.entity";

export class QuoteRepository implements IQuoteRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  public async getQuoteById(id: string): Promise<Quote | null> {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
      include: {
        customers: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!quote) return null;
    const productsList: QuoteProduct[] = quote.products.map((product) =>
      new QuoteProduct(
        product.id,
        product.productId ?? '',
        product.productName ?? '',
        product.unitPrice ?? 0,
        product.quantity ?? 0,
        product.quoteId ?? ''
      )
    );
    const store = quote.store;
    const customer = quote.customers;
    if (!store || !customer) return null;
    const storeEntity = new Store(
      store.id,
      store.name,
      store.address,
      store.revenue,
    );
    const customerEntity = new QuoteCustomer(
      customer.id,
      customer.name ?? '',
      customer.address ?? '',
      customer.phoneNumber ?? ''
    );
    
    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      productsList,
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
      storeEntity,
      customerEntity
    );
  }

  public async createQuote(
    storeId: string,
    customerId: string,
    products: QuoteProduct[],
    orderDate: string,
    address?: string,
    shippingOn?: string | null,
    type?: string,
    creditTerm?: number,
    status?: string,
  ): Promise<Quote> {
    const quote = await this.prisma.quote.create({
      data: {
        storeId,
        customerId,
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.productId,
              productName: product.productName,
              unitPrice: product.unitPrice,
              quantity: product.quantity,
            })),
          },
        },
        orderDate,
        address,
        shippingOn,
        type: type as PaymentType,
        creditTerm,
        status: status as Status,
        total: products.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0), 
      },
      include: {
        products: true,
      },
    });
    const productsList: QuoteProduct[] = quote.products.map((product) =>
      new QuoteProduct(
        product.id,
        product.productId ?? '', 
        product.productName ?? '',
        product.unitPrice ?? 0,
        product.quantity ?? 0,
        product.quoteId ?? ''
      )
    );
        

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      productsList,
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
  public async updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ): Promise<Quote> {   
    const quote = await this.prisma.quote.update({
      where: { id },
      data: {
        orderDate,
        shippingOn,
      },
      include: {
        products: true,
      },
    });

    const productsList: QuoteProduct[] = quote.products.map((product) =>
      new QuoteProduct(
        product.id,
        product.productId ?? '',
        product.productName ?? '',
        product.unitPrice ?? 0,
        product.quantity ?? 0,
        product.quoteId ?? ''
      )
    );

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      productsList,
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
  public async updateTotal(id: string, total: number): Promise<Quote> {
    const quote = await this.prisma.quote.update({
      where: { id },
      data: { total },
      include: {
        products: true,
      },
    });

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      quote.products.map((product) =>
        new QuoteProduct(
          product.id,
          product.productId ?? '',
          product.productName ?? '',
          product.unitPrice ?? 0,
          product.quantity ?? 0,
          product.quoteId ?? ''
        )
      ),
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
  public async deleteQuote(id: string): Promise<Quote> {
    const quote = await this.prisma.quote.delete({
      where: { id },
      include: {
        products: true,
      },
    });

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      quote.products.map((product) =>
        new QuoteProduct(
          product.id,
          product.productId ?? '',
          product.productName ?? '',
          product.unitPrice ?? 0,
          product.quantity ?? 0,
          product.quoteId ?? ''
        )
      ),
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
  public async updatePaymentType(
    id: string,
    type: string,
    creditTerm?: number | null,
  ): Promise<Quote> {
    const quote = await this.prisma.quote.update({
      where: { id },
      data: {
        type: type as PaymentType,
        creditTerm,
      },
      include: {
        products: true,
      },
    });

    const productsList: QuoteProduct[] = quote.products.map((product) =>
      new QuoteProduct(
        product.id,
        product.productId ?? '',
        product.productName ?? '',
        product.unitPrice ?? 0,
        product.quantity ?? 0,
        product.quoteId ?? ''
      )
    );

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      productsList,
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
  public async updateQuoteStatus(id: string, status: string): Promise<Quote> {
    const quote = await this.prisma.quote.update({
      where: { id },
      data: { status: status as Status },
      include: {
        products: true,
      },
    });

    const productsList: QuoteProduct[] = quote.products.map((product) =>
      new QuoteProduct(
        product.id,
        product.productId ?? '',
        product.productName ?? '',
        product.unitPrice ?? 0,
        product.quantity ?? 0,
        product.quoteId ?? ''
      )
    );

    return new Quote(
      quote.id,
      quote.customerId ?? '',
      quote.storeId,
      productsList,
      quote.total ?? 0,
      quote.orderDate ?? '',
      quote.address ?? '',
      quote.shippingOn ?? null,
      quote.type as PaymentType ?? '',
      quote.creditTerm ?? null,
      quote.status as Status ?? '',
    );
  }
}