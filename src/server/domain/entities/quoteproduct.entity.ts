export class QuoteProduct {
  id: string;
  quoteId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;

  constructor(
    id: string,
    quoteId: string,
    productId: string,
    quantity: number,
    unitPrice: number,
    productName: string,
  ) {
    this.id = id;
    this.quoteId = quoteId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.productName = productName;
  }
  validate() {
    if (!this.quoteId) {
      throw new Error("Quote ID is required");
    }
    if (!this.productId) {
      throw new Error("Product ID is required");
    }
    if (this.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    if (this.unitPrice <= 0) {
      throw new Error("Unit Price must be greater than 0");
    }
    if (!this.productName) {
      throw new Error("Product Name is required");
    }
  }
  update(
    quoteId?: string,
    productId?: string,
    quantity?: number,
    unitPrice?: number,
    productName?: string,
  ) {
    if (quoteId) this.quoteId = quoteId;
    if (productId) this.productId = productId;
    if (quantity) this.quantity = quantity;
    if (unitPrice) this.unitPrice = unitPrice;
    if (productName) this.productName = productName;
  }
}
