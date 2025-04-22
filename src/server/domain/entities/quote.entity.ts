import type { PaymentType } from "../enums/payment-type.enum";
import type { Status } from "../enums/status.enum";
import type { QuoteCustomer } from "./quotecustomer.entity";
import { QuoteProduct } from "./quoteproduct.entity";
import type { Store } from "./store.entity";

export class Quote {
  id: string;
  customerId: string;
  storeId: string;
  products: QuoteProduct[];
  total: number;
  orderDate: string;
  address?: string;
  shippingOn?: string | null;
  type: PaymentType;
  creditTerm: number | null;
  status: Status;
  store: Store | undefined;
  customer: QuoteCustomer | undefined;
  constructor(
    id: string,
    customerId: string,
    storeId: string,
    products: QuoteProduct[],
    total: number,
    orderDate: string,
    address: string | undefined,
    shippingOn: string | null,
    type: PaymentType,
    creditTerm: number | null,
    status: Status,
    store?: Store,
    customer?: QuoteCustomer,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.storeId = storeId;
    this.products = products;
    this.total = total;
    this.orderDate = orderDate;
    this.address = address;
    this.shippingOn = shippingOn;
    this.type = type;
    this.creditTerm = creditTerm;
    this.status = status;
    this.store = store;
    this.customer = customer;
  }
  update(
    orderDate: string,
    address?: string,
    shippingOn?: string | null,
    type?: PaymentType,
    creditTerm?: number | null,
    Status?: Status,
  ) {
    this.orderDate = orderDate;
    this.address = address;
    this.shippingOn = shippingOn;
    if (type) {
      this.type = type;
    }
    if (creditTerm) {
      this.creditTerm = creditTerm;
    }
    if (Status) {
      this.status = Status;
    }
  }
}
