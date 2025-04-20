import { QuoteCustomer } from "../../entities/quotecustomer.entity";

export interface IQuoteCustomerRepository {
  createQuoteCustomer(
    quoteId: string,
    data: {
      customerId: string;
      name?: string | null;
      taxId?: string | null;
      phoneNumber: string;
      address?: string | null;
    },
  ): Promise<QuoteCustomer>;
  updateQuoteCustomer(
    id: string,
    data: {
      customerId?: string;
      name?: string | null;
      taxId?: string | null;
      phoneNumber?: string;
      address?: string | null;
    },
  ): Promise<QuoteCustomer | null>;
}
