import { quoteproduct } from "../models/quoteproduct.model";

export const quotesService = {
  async getAllQuoteProducts() {
    return await quoteproduct.getAllQuoteProducts();
  },

  async getQuoteProductById(id: string) {
    return await quoteproduct.getQuoteProductById(id);
  },

  async createQuoteProduct(quoteId: string, productId: string) {
    return await quoteproduct.createQuoteProduct(quoteId, productId);
  },

  async updateQuoteProduct(
    id: string,
    data: {
      quantity?: number;
      price?: number;
    },
  ) {
    return await quoteproduct.updateQuoteProduct(id, data);
  },

  async deleteQuoteProductById(id: string) {
    return await quoteproduct.deleteQuoteProductById(id);
  },
  async deleteQuoteProduct(productId: string, quoteId: string) {
    return await quoteproduct.deleteQuoteProduct(productId, quoteId);
  },
};
