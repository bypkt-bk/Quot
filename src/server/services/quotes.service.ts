import { quoteModel } from "../models/quotes.model";
import { Status } from "@prisma/client";

export const quotesService = {
  async getAllQuotes() {
    return await quoteModel.getQuotes();
  },

  async getQuote(id: string) {
    return await quoteModel.getQuoteById(id);
  },

  async createQuote(
    customerId: string,
    storeId: string,
    products: Array<{ productId: string; quantity: number }>,
    orderDate: string,
    shippingOn?: string,
  ) {
    return await quoteModel.createQuote(
      customerId,
      storeId,
      products,
      orderDate,
      Status.unpaid,
      shippingOn,
    );
  },

  async markAsPaid(id: string) {
    return await quoteModel.updateQuoteStatus(id, Status.paid);
  },

  async deleteQuote(id: string) {
    return await quoteModel.deleteQuote(id);
  },
};
