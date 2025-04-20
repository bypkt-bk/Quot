export class QuoteCustomer {
  id: string;
  quoteId: string;
  customerId: string;
  name?: string | null;
  taxId?: string | null;
  phoneNumber: string;
  address?: string | null;

  constructor(
    id: string,
    quoteId: string,
    customerId: string,
    phoneNumber: string,
    name?: string | null,
    taxId?: string | null,
    address?: string | null,
  ) {
    this.id = id;
    this.quoteId = quoteId;
    this.customerId = customerId;
    this.phoneNumber = phoneNumber;
    this.name = name || null;
    this.taxId = taxId || null;
    this.address = address || null;
  }
  validate() {
    if (!this.quoteId) {
      throw new Error("Quote ID is required");
    }
    if (!this.customerId) {
      throw new Error("Customer ID is required");
    }
    if (!this.phoneNumber) {
      throw new Error("Phone number is required");
    }
  }
  update(data: {
    name?: string;
    taxId?: string;
    phoneNumber?: string;
    address?: string;
  }) {
    if (data.name) this.name = data.name;
    if (data.taxId) this.taxId = data.taxId;
    if (data.phoneNumber) this.phoneNumber = data.phoneNumber;
    if (data.address) this.address = data.address;
  }
}
