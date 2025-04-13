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

export type Quote = {
  id: string;
  total: number;
  orderDate: string;
  shippingOn: string | null;
  status: Status;
  customerId: number | null;
  customer: Customer | null;
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
};

export type Customer = {
  id: string;
  name: string;
  address: string;
  storeId: string;
  store: Store;
  quotes: Quote[];
};
