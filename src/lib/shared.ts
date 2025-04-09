export type User = {
  id: number;
  email: string;
  name: string;
  taxId: string | null;
  phoneNumber: string | null;
  ownedStores: Store[];
  adminStores: Store[];
};
export type Store = {
  id: number;
  name: string;
  address: string;
  owner: User[] | null;
  admin: User[] | null;
  revenue: number;
  quote: Quote[];
};
export type Product = {
  id: number;
  name: string;
  price: number;
};
export enum Status {
  unpaid = "unpaid",
  paid = "paid",
}
export type Quote = {
  id: number;
  total: number;
  orderDate: string;
  shippingOn: string | null;
  status: Status;
  customer: Customer;
  product: QuoteProduct[];
  storeId: number;
};
export type QuoteProduct = {
  quoteId: number;
  product: Product;
  quantity: number;
};
export type Customer = {
  id: number;
  name: string;
  address: string;
};
