import type { Customer } from "./customer.entity";
import type { Product } from "./product.entity";
import type { Quote } from "./quote.entity";
import type { User } from "./user.entity";

export class Store {
  id: string;
  name: string;
  address: string | null;
  revenue: number;
  owner:     User[] | undefined ;
  quote:     Quote[] | undefined;
  products:  Product[] | undefined;
  customers: Customer[] | undefined;

  constructor(
    id: string,
    name: string,
    address: string | null,
    revenue: number,
    owner?: User[],
    quote?: Quote[],
    products?: Product[],
    customers?: Customer[],
  ) {
    this.id = id;
    this.name = name;
    this.address = address || null;
    this.revenue = revenue || 0;
    this.owner = owner || [];
    this.quote = quote || [];
    this.products = products || [];
    this.customers = customers || [];
  }
  validate() {
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (!this.address) {
      throw new Error("Address is required");
    }
    if (!this.revenue) {
      throw new Error("Revenue is required");
    }
  }
  update(name?: string, address?: string | null, revenue?: number) {
    if (name) this.name = name;
    if (address) this.address = address;
    if (revenue) this.revenue = revenue;
  }
}
