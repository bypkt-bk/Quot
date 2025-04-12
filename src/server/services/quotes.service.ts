import { quoteModel } from "../models/quotes.model";
import { Status } from "@prisma/client";

export const quotesService = {
  async getAllQuotes() {
    return await quoteModel.getQuotes();
  },

  async getQuote(id: number) {
    return await quoteModel.getQuoteById(id);
  },

  async createQuote(
    customerId: number,
    storeId: number,
    products: Array<{ productId: number; quantity: number }>,
    orderDate: string,
    shippingOn?: string
  ) {
    return await quoteModel.createQuote(
      customerId,
      storeId,
      products,
      orderDate,
      Status.unpaid,
      shippingOn
    );
  },

  async markAsPaid(id: number) {
    return await quoteModel.updateQuoteStatus(id, Status.paid);
  },

  async deleteQuote(id: number) {
    return await quoteModel.deleteQuote(id);
  }
};