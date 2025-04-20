import { Product } from "@/server/domain/entities/product.entity";
import { Store } from "../../domain/entities/store.entity";
import type { IStoreRepository } from "../../domain/interfaces/repositories/store.repository";
import { PrismaClient } from "@prisma/client";
import { Customer } from "@/server/domain/entities/customer.entity";
import { Quote } from "@/server/domain/entities/quote.entity";
import { QuoteProduct } from "@/server/domain/entities/quoteproduct.entity";
import { User } from "@/server/domain/entities/user.entity";

export class StoreRepository implements IStoreRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  updateStoreOwner(id: string, newOwnerIds: string[]): Promise<Store | null> {
    throw new Error("Method not implemented.");
  }
  deleteStore(id: string): Promise<Store | null> {
    throw new Error("Method not implemented.");
  }

  public async getStoreById(id: string): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        owner: true,
        admin: true,
        quote: {
          include: {
            customers: true,
            products: true,
          },
        },
        products: true,
        customers: true,
      },
    });

    if (!store) return null;

    const storeWithProducts = store.products.map((product) => {
      return new Product(
        product.id,
        product.name,
        product.price,
        product.storeId,
      );
    });
    const storeWithCustomers = store.customers.map((customer) => {
      return new Customer(
        customer.id,
        customer.name ?? "",
        customer.phoneNumber,
        customer.address,
        customer.taxId,
        customer.storeId,
      );
    });
    const storeWithQuotes = store.quote.map((quote) => {
      // Map quote products if available
      const productsList = quote.products
        ? quote.products.map((product) =>
            // Map to QuoteProduct entity
            new QuoteProduct(
              product.id,
              product.productId ?? "",
              product.productName ?? "",
              product.unitPrice ?? 0,
              product.quantity ?? 0,
              product.quoteId ?? "",
            ),
          )
        : [];

      // Pass all required arguments to the Quote constructor
      return new Quote(
        quote.id,
        quote.customerId ?? "",
        quote.storeId ?? "",
        productsList,
        quote.total ?? 0,
        quote.orderDate ?? "",
        quote.address ?? "",
        quote.shippingOn ?? null,
        (quote.type as import("@/server/domain/enums/payment-type.enum").PaymentType) ?? "",
        quote.creditTerm ?? null,
        (quote.status as import("@/server/domain/enums/status.enum").Status) ?? "",
        
      );
    });
    const storeWithOwners = store.owner.map((owner) => {
      return new User(
        owner.id,
        owner.name,
        owner.email,
        owner.googleId,
      );
    });
    const storeWithAdmins = store.admin.map((admin) => {
      return new User(
        admin.id,
        admin.name,
        admin.email,
        admin.googleId
      );
    });

    return new Store(store.id, store.name, store.address, store.revenue || 0, storeWithOwners, storeWithAdmins, storeWithQuotes, storeWithProducts, storeWithCustomers);
  }
  public async getAllStores(): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });
    return stores.map((store) => {
      return new Store(store.id, store.name, store.address, store.revenue);
    });
  }
  public async createStore(
    name: string,
    address: string,
    ownerIds: string[],
    revenue?: number,
    adminIds?: string[],
  ): Promise<Store | null> {
    const store = await this.prisma.store.create({
      data: {
        name,
        address,
        revenue: revenue || 0,
        owner: {
          connect: ownerIds.map((id) => ({ id })),
        },
        admin: {
          connect: adminIds?.map((id) => ({ id })),
        },
      },
    });

    return new Store(store.id, store.name, store.address, store.revenue);
  }
  public async getStoreByOwnerId(userId: string): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      where: {
        owner: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });

    return stores.map((store) => {
      return new Store(store.id, store.name, store.address, store.revenue);
    });
  }
  public async updateStore(
    id: string,
    data: {
      name?: string;
      address?: string;
      revenue?: number;
    },
  ): Promise<Store | null> {
    const store = await this.prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        revenue: data.revenue,
      },
      include: {
        owner: true,
        admin: true,
        quote: true,
        products: true,
        customers: true,
      },
    });

    if (!store) return null;

    return new Store(store.id, store.name, store.address, store.revenue);
  }
}
