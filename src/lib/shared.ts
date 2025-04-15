import type { QuoteCustomer } from "@prisma/client";

export type User = {
  id: string;
  googleId: string;
  email: string;
  name: string;
  taxId: string | null;
  phoneNumber: string | null;
  ownedStores: Store[];
  adminStores: Store[];
};

export type Store = {
  id: string;
  name: string;
  address: string;
  revenue: number;
  owner: User[];
  admin: User[];
  quote: Quote[];
  products: Product[];
  customers: Customer[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  storeId: string;
  store: Store;
  quoteProducts: QuoteProduct[];
};

export enum Status {
  unpaid = "unpaid",
  paid = "paid",
}

export enum PaymentType {
  cash = "cash",
  creditterm = "credit term",
}
export type Quote = {
  id: string;
  total: number;
  orderDate: string;
  shippingOn: string | null;
  address: string | null;
  type: PaymentType;
  creditTerm: String | null;
  status: Status;
  customerId: number | null;
  customers: QuoteCustomer;
  storeId: string;
  store: Store;
  products: QuoteProduct[];
};

export type QuoteProduct = {
  id: string;
  quoteId: string;
  quote: Quote;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type Customer = {
  id: string;
  name: string;
  phoneNumber: string | null;
  address: string;
  taxId: string | null;
  storeId: string;
  store: Store;
  quotes: Quote[];
};
