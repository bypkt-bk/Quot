import { quoteCustomerModel } from "../models/quotecustomers.model";

export const quoteCustomerService = {
  async getAll() {
    return await quoteCustomerModel.getAll();
  },

  async getById(id: string) {
    if (!id) throw new Error("ID is required");
    return await quoteCustomerModel.getById(id);
  },

  async getByQuoteId(quoteId: string) {
    if (!quoteId) throw new Error("quoteId is required");
    return await quoteCustomerModel.getByQuoteId(quoteId);
  },

  async createQuoteCustomer(input: {
    quoteId: string;
    name: string;
    taxId?: string;
    phoneNumber: string;
    address: string;
    customerId: string;
  }) {
    const { quoteId, name, phoneNumber, address, customerId } = input;
    if (!quoteId || !name || !phoneNumber || !address || !customerId) {
      throw new Error("Missing required fields");
    }

    return await quoteCustomerModel.create(input);
  },

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
    return await quoteCustomerModel.update(id, data);
  },

  async deleteQuoteCustomer(id: string) {
    if (!id) throw new Error("ID is required for deletion");
    return await quoteCustomerModel.delete(id);
  },
};
