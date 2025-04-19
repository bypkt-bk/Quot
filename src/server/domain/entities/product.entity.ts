export class Product {
  id: string;
  name: string;
  price: number;
  storeId: string;

  constructor(
    id: string,
    name: string,
    price: number,
    storeId: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.storeId = storeId;
  }
    validate() {
        if (!this.name) {
        throw new Error("Name is required");
        }
        if (this.price <= 0) {
        throw new Error("Price must be greater than 0");
        }
        if (!this.storeId) {
        throw new Error("Store ID is required");
        }
    }
    update(
        name?: string,
        price?: number,
        storeId?: string,
    ) {
        if (name) this.name = name;
        if (price) this.price = price;
        if (storeId) this.storeId = storeId;
    }
}