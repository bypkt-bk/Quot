import { QuoteProduct } from "../../entities/quoteproduct.entity";
import { Quote } from "../../entities/quote.entity";

export interface IQuoteRepository {
  createQuote(
    storeId: string,
    customerId: string,
    products: QuoteProduct[],
    orderDate: string,
    address?: string,
    shippingOn?: string | null,
    type?: string,
    creditTerm?: number,
    status?: string,
  ): Promise<Quote>;
  updateOrderOnAndShippingOn(
    id: string,
    orderDate: string,
    shippingOn?: string | null,
  ): Promise<Quote>;
  updateTotal(id: string, total: number): Promise<Quote>;
  deleteQuote(id: string): Promise<Quote>;
  updatePaymentType(
    id: string,
    type: string,
    creditTerm?: number | null,
  ): Promise<Quote>;
  updateQuoteStatus(id: string, status: string): Promise<Quote>;
}