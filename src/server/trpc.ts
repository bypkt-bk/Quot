import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { storesService } from "./services/stores.service";
import { productsService } from "./services/products.service";
import { customersService } from "./services/customers.service";
import { quotesService } from "./services/quotes.service";
import { usersService } from "./services/users.service";
import { Status } from "@prisma/client";

const t = initTRPC.create();

export const appRouter = t.router({
  // Store Routes
  store: t.router({
    getAll: t.procedure.query(() => storesService.getStores()),
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => storesService.getStoreById(input)),
    create: t.procedure
      .input(
        z.object({
          name: z.string(),
          address: z.string(),
          ownerIds: z.array(z.string()),
          revenue: z.number().optional(),
          adminIds: z.array(z.string()).optional(),
        }),
      )
      .mutation(({ input }) =>
        storesService.createStore(
          input.name,
          input.address,
          input.ownerIds,
          input.revenue,
          input.adminIds,
        ),
      ),
    getStoreByOwnerId: t.procedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ input }) => {
        return storesService.getStoreByOwnerId(input.userId);
      }),
    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            name: z.string().optional(),
            address: z.string().optional(),
            revenue: z.number().optional(),
          }),
        }),
      )
      .mutation(({ input }) => storesService.updateStore(input.id, input.data)),
    updateOwners: t.procedure
      .input(
        z.object({
          id: z.string(),
          newOwnerIds: z.array(z.number()),
        }),
      )
      .mutation(({ input }) =>
        storesService.updateStoreOwner(input.id, input.newOwnerIds),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => storesService.deleteStore(input)),
  }),

  // Product Routes
  product: t.router({
    getByStore: t.procedure
      .input(z.string())
      .query(({ input }) => productsService.getStoreProducts(input)),
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => productsService.getProduct(input)),
    create: t.procedure
      .input(
        z.object({
          storeId: z.string(),
          name: z.string(),
          price: z.number(),
        }),
      )
      .mutation(({ input }) =>
        productsService.createProduct(input.storeId, input.name, input.price),
      ),
    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            name: z.string().optional(),
            price: z.number().optional(),
          }),
        }),
      )
      .mutation(({ input }) =>
        productsService.updateProduct(input.id, input.data),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => productsService.deleteProduct(input)),
  }),

  // Customer Routes
  customer: t.router({
    getByStore: t.procedure
      .input(z.string())
      .query(({ input }) => customersService.getStoreCustomers(input)),
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => customersService.getCustomer(input)),
    create: t.procedure
      .input(
        z.object({
          storeId: z.string(),
          name: z.string(),
          address: z.string(),
        }),
      )
      .mutation(({ input }) =>
        customersService.createCustomer(
          input.storeId,
          input.name,
          input.address,
        ),
      ),
    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            name: z.string().optional(),
            address: z.string().optional(),
          }),
        }),
      )
      .mutation(({ input }) =>
        customersService.updateCustomer(input.id, input.data),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => customersService.deleteCustomer(input)),
  }),

  // Quote Routes
  quote: t.router({
    getAll: t.procedure.query(() => quotesService.getAllQuotes()),
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => quotesService.getQuote(input)),
    create: t.procedure
      .input(
        z.object({
          customerId: z.string(),
          storeId: z.string(),
          products: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number(),
            }),
          ),
          orderDate: z.string(),
          shippingOn: z.string().optional(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.createQuote(
          input.customerId,
          input.storeId,
          input.products,
          input.orderDate,
          input.shippingOn,
        ),
      ),
    markPaid: t.procedure
      .input(z.string())
      .mutation(({ input }) => quotesService.markAsPaid(input)),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => quotesService.deleteQuote(input)),
  }),

  // User Routes
  user: t.router({
    getByGoogleId: t.procedure
      .input(z.string())
      .query(({ input }) => usersService.getUserByGoogleId(input)),
    create: t.procedure
      .input(
        z.object({
          name: z.string(),
          email: z.string(),
          googleId: z.string(),
        }),
      )
      .mutation(({ input }) =>
        usersService.createUser(input.name, input.email, input.googleId),
      ),
    update: t.procedure
      .input(
        z.object({
          googleId: z.string(),
          name: z.string(),
          email: z.string().optional(),
          taxId: z.string().optional(),
          phoneNumber: z.string().optional(),
        }),
      )
      .mutation(({ input }) =>
        usersService.updateUser(
          input.googleId,
          input.name,
          input.email,
          input.taxId,
          input.phoneNumber,
        ),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => usersService.deleteUser(input)),
  }),
});

export type AppRouter = typeof appRouter;
