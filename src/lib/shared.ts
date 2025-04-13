export type User = {
  id: number;
  googleId: string;
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
  revenue: number;
  owner: User[];
  admin: User[];
  quote: Quote[];
  products: Product[];
  customers: Customer[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  storeId: number;
  store: Store;
  quoteProducts: QuoteProduct[];
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
  customerId: number | null;
  customer: Customer | null;
  storeId: number;
  store: Store;
  products: QuoteProduct[];
};

export type QuoteProduct = {
  id: number;
  quoteId: number;
  quote: Quote;
  productId: number;
  product: Product;
  quantity: number;
};

export type Customer = {
  id: number;
  name: string;
  address: string;
  storeId: number;
  store: Store;
  quotes: Quote[];
};
