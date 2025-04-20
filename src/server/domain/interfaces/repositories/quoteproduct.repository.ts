import type { QuoteProduct } from "../../entities/quoteproduct.entity";

export interface IQuoteProductRepository {
  createQuoteProduct(
    quoteId: string,
    data: {
      productId: string;
      quantity: number;
      unitPrice: number;
      productName: string;
      
    },
  ): Promise<QuoteProduct | null>;
  updateQuoteProduct(
    id: string,
    data: {
        productId?: string;
        quantity?: number;
        unitPrice?: number;
        productName?: string;
    },
  ): Promise<QuoteProduct | null>;
  deleteQuoteProduct(        quoteId: string,        productId: string,): Promise<QuoteProduct | null>;
}