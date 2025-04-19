import type { IQuoteCustomerRepository } from "../domain/interfaces/repositories/quotecustomer.repository";

export class QuoteCustomerService {
  private quoteCustomerModel: IQuoteCustomerRepository;
  constructor(quoteCustomerModel: IQuoteCustomerRepository) {
    this.quoteCustomerModel = quoteCustomerModel;
  }
  async createQuoteCustomer(
    quoteId: string,
    customerId: string,
    name: string,
    phoneNumber: string,
    address: string,
    taxId: string,
  ) {

    const quoteCustomer = await this.quoteCustomerModel.createQuoteCustomer(
      quoteId,
      {
        customerId,
        name,
        phoneNumber,
        address,
        taxId,
      },
    );
    return quoteCustomer;
  }

  async updateQuoteCustomer(
    id: string,
    data: {
      name?: string;
      taxId?: string;
      phoneNumber?: string;
      address?: string;
    },
  ) {
    if (!id) throw new Error("ID is required for update");
    return await this.quoteCustomerModel.updateQuoteCustomer(id, data);
  }

};
