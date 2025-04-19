import { QuoteProduct } from "../domain/entities/quoteproduct.entity";
import type { PaymentType } from "../domain/enums/payment-type.enum";
import type { Status } from "../domain/enums/status.enum";
import type { IQuoteRepository } from "../domain/interfaces/repositories/quote.repository";

export class QuotesService{
  private quoteModel: IQuoteRepository;
  constructor(quoteModel: IQuoteRepository) {
    this.quoteModel = quoteModel;
  }
  async createQuote(
    storeId: string,
    customerId: string,
    products: {
      productId: string;
      productName: string;
      unitPrice: number;
      quantity: number;
    }[],
    orderDate: string,
    type: PaymentType,
    status: Status,
    address?: string,
    shippingOn?: string | null,
    creditTerm?: number,
  ) {
    // Convert plain product objects to QuoteProduct instances
    const quoteProducts = products.map(
      (product) =>
        new QuoteProduct(
          '', // id will be assigned by the database
          product.productId,
          product.productName,
          product.unitPrice,
          product.quantity,
          '' // quoteId will be assigned after quote creation
        )
    );
    return await this.quoteModel.createQuote(
      storeId,
      customerId,
      quoteProducts,
      orderDate,
      address,
      shippingOn,
      type,
      creditTerm,
      status,
    );
  }

  async markAsPaid(id: string, status: Status) {
    return await this.quoteModel.updateQuoteStatus(id, status);
  }
  async updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ) {
    return await this.quoteModel.updateOrderOnAndShippingOn(
      id,
      orderDate,
      shippingOn,
    );
  }
  async updateTotal(id: string, total: number) {
    return await this.quoteModel.updateTotal(id, total);
  }
  async deleteQuote(id: string) {
    return await this.quoteModel.deleteQuote(id);
  }
  async updatePaymentType(
    id: string,
    type: PaymentType,
    creditTerm?: number | null,
  ) {
    return await this.quoteModel.updatePaymentType(id, type, creditTerm);
  }
};
