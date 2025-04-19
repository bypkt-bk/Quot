import type { IQuoteProductRepository } from "../domain/interfaces/repositories/quoteproduct.repository";

export class QuotesProductService {
  private quoteProductModel: IQuoteProductRepository;
  constructor(quoteProductModel: IQuoteProductRepository) {
    this.quoteProductModel = quoteProductModel;
  }
  async createQuoteProduct(
    quoteId: string,
    productId: string,
    quantity: number,
    unitPrice: number,
    productName: string,
  ) {
    return await this.quoteProductModel.createQuoteProduct(
      quoteId,
      {
        productId,
        quantity,
        unitPrice,
        productName,
      }
    );
  }

  async updateQuoteProduct(
    id: string,
    data: {
      quantity?: number;
      price?: number;
      unitPrice?: number;
      productName?: string;
    },
  ) {
    return await this.quoteProductModel.updateQuoteProduct(id, data);
  }

  async deleteQuoteProductById(id: string) {
    return await this.quoteProductModel.deleteQuoteProduct(id);
  }
};
