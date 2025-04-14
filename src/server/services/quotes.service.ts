import { quoteModel } from "../models/quotes.model";
import { Status, type QuoteProduct, PaymentType } from "@prisma/client";

export const quotesService = {
  async getAllQuotes() {
    return await quoteModel.getQuotes();
  },

  async getQuote(id: string) {
    return await quoteModel.getQuoteById(id);
  },

  async createQuote(
    storeId: string,
    customerId: string,
    products: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[],
    orderDate: string,
    address?: string,
    shippingOn?: string | null,
  ) {
    return await quoteModel.createQuote(
      storeId,
      customerId,
      products,
      orderDate,
      PaymentType.cash,
      Status.unpaid,
      address,
      shippingOn,
    );
  },
  async updateAddress(id: string, address: string) {
    return await quoteModel.updateAddress(id, address);
  },

  async markAsPaid(id: string, status: Status) {
    return await quoteModel.updateQuoteStatus(id, status);
  },
  async updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ) {
    return await quoteModel.updateOrderOnAndShippingOn(
      id,
      orderDate,
      shippingOn,
    );
  },
  async updateTotal(id: string, total: number) {
    return await quoteModel.updateTotal(id, total);
  },
  async deleteQuote(id: string) {
    return await quoteModel.deleteQuote(id);
  },
};
