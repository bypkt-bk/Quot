import { quoteModel } from "../models/quotes.model"; // Adjusted the path to the correct location
import { Prisma, Status } from "@prisma/client";

export const quoteService = {
  async getAllQuotes() {
    try {
      return await quoteModel.getQuotes();
    } catch (error) {
      throw new Error("Error fetching quotes: " + error);
    }
  },

  async getQuoteById(id: number) {
    try {
      const quote = await quoteModel.getQuoteById(id);
      if (!quote) {
        throw new Error(`Quote with ID ${id} not found`);
      }
      return quote;
    } catch (error) {
      throw new Error("Error fetching quote: " + error);
    }
  },

  async createQuote(
    total: number,
    orderDate: string,
    customerId: number,
    storeId: number,
    status: Status,
    shippingOn?: string,
  ) {
    try {
      return await quoteModel.createQuote(
        total,
        orderDate,
        customerId,
        storeId,
        status,
        shippingOn,
      );
    } catch (error) {
      throw new Error("Error creating quote: " + error);
    }
  },

  async updateQuote(
    id: number,
    data: {
      total?: number;
      orderDate?: string;
      shippingOn?: string;
      status?: Status;
    },
  ) {
    try {
      return await quoteModel.updateQuote(id, data);
    } catch (error) {
      throw new Error("Error updating quote: " + error);
    }
  },

  async deleteQuote(id: number) {
    try {
      return await quoteModel.deleteQuote(id);
    } catch (error) {
      throw new Error("Error deleting quote: " + error);
    }
  },
};
