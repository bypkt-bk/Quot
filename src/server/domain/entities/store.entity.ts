export class Store {
  id: string;
  name: string;
  address: string | null;
  revenue: number;

  constructor(
    id: string,
    name: string,
    address: string | null,
    revenue: number,
  ) {
    this.id = id;
    this.name = name;
    this.address = address || null;
    this.revenue = revenue || 0;
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
