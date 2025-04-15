import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { storesService } from "./services/stores.service";
import { productsService } from "./services/products.service";
import { customersService } from "./services/customers.service";
import { quotesService } from "./services/quotes.service";
import { usersService } from "./services/users.service";
import { Status } from "@prisma/client";
import { quoteproduct } from "./models/quoteproduct.model";
import { quoteCustomerService } from "./services/quotecustomers.service";
import { updateCurrentUser } from "firebase/auth";

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
      .input(z.string())
      .query(async ({ input }) => {
        return storesService.getStoreByOwnerId(input);
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

    incrementRevenue: t.procedure
      .input(
        z.object({
          id: z.string(),
          revenue: z.number(),
        }),
      )
      .mutation(({ input }) =>
        storesService.incrementRevenue(input.id, input.revenue),
      ),

    decreaseRevenue: t.procedure
      .input(
        z.object({
          id: z.string(),
          revenue: z.number(),
        }),
      )
      .mutation(({ input }) =>
        storesService.decreaseRevenue(input.id, input.revenue),
      ),
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
    getByStoreIdAndPhone: t.procedure
      .input(
        z.object({
          storeId: z.string(),
          phoneNumber: z.string(),
        }),
      )
      .query(({ input }) =>
        customersService.getCustomerByStoreIdAndPhone(
          input.storeId,
          input.phoneNumber,
        ),
      ),
    create: t.procedure
      .input(
        z.object({
          storeId: z.string(),
          name: z.string(),
          phoneNumber: z.string(),
          address: z.string(),
          taxId: z.string(),
        }),
      )
      .mutation(({ input }) =>
        customersService.createCustomer(
          input.storeId,
          input.name,
          input.phoneNumber,
          input.address,
          input.taxId,
        ),
      ),
    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            name: z.string().nullable().optional(),
            address: z.string().nullable().optional(),
            phoneNumber: z.string(),
            taxId: z.string().nullable().optional(),
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
          storeId: z.string(),
          customerId: z.string(),
          products: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number(),
              unitPrice: z.number(),
            }),
          ),
          orderDate: z.string(),
          address: z.string().optional(),
          shippingOn: z.string().nullable().optional(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.createQuote(
          input.storeId,
          input.customerId,
          input.products,
          input.orderDate,
          input.address,
          input.shippingOn,
        ),
      ),
    updateAddress: t.procedure
      .input(
        z.object({
          id: z.string(),
          address: z.string(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.updateAddress(input.id, input.address),
      ),
    updateTotal: t.procedure
      .input(
        z.object({
          id: z.string(),
          total: z.number(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.updateTotal(input.id, input.total),
      ),
    updateOrderOnAndShippingOn: t.procedure
      .input(
        z.object({
          id: z.string(),
          orderDate: z.string(),
          shippingOn: z.string().nullable().optional(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.updateOrderOnAndShippingOn(
          input.id,
          input.orderDate,
          input.shippingOn,
        ),
      ),

    markPaid: t.procedure
      .input(
        z.object({
          id: z.string(),
          status: z.enum([Status.unpaid, Status.paid]),
        }),
      )
      .mutation(({ input }) =>
        quotesService.markAsPaid(input.id, input.status),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => quotesService.deleteQuote(input)),

    updatePaymentType: t.procedure
      .input(
        z.object({
          id: z.string(),
          type: z.enum(["cash", "creditterm"]),
          creditTerm: z.number().nullable().optional(),
        }),
      )
      .mutation(({ input }) =>
        quotesService.updatePaymentType(input.id, input.type, input.creditTerm),
      ),
  }),

  // User Routes
  user: t.router({
    getByGoogleId: t.procedure
      .input(z.string())
      .query(({ input }) => usersService.getUserByGoogleId(input)),
    getByUserId: t.procedure
      .input(z.string())
      .query(({ input }) => usersService.getUserById(input)),
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
  // Quote Product Routes
  quoteproduct: t.router({
    getByQuoteId: t.procedure
      .input(z.string())
      .query(({ input }) => quoteproduct.getAllQuoteProducts()),
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => quoteproduct.getQuoteProductById(input)),
    create: t.procedure
      .input(
        z.object({
          quoteId: z.string(),
          productId: z.string(),
          unitPrice: z.number(),
        }),
      )
      .mutation(({ input }) =>
        quoteproduct.createQuoteProduct(
          input.quoteId,
          input.productId,
          input.unitPrice,
        ),
      ),
    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            quantity: z.number().optional(),
            price: z.number().optional(),
            unitPrice: z.number().optional(),
          }),
        }),
      )
      .mutation(({ input }) =>
        quoteproduct.updateQuoteProduct(input.id, input.data),
      ),
    delete: t.procedure
      .input(z.string())
      .mutation(({ input }) => quoteproduct.deleteQuoteProductById(input)),
    deleteQuoteProduct: t.procedure
      .input(
        z.object({
          productId: z.string(),
          quoteId: z.string(),
        }),
      )
      .mutation(({ input }) =>
        quoteproduct.deleteQuoteProduct(input.productId, input.quoteId),
      ),
  }),
  // Quote Customer Routes
  quotecustomer: t.router({
    getAll: t.procedure.query(async () => {
      return await quoteCustomerService.getAll();
    }),

    getById: t.procedure.input(z.string()).query(async ({ input }) => {
      return await quoteCustomerService.getById(input);
    }),

    getByQuoteId: t.procedure.input(z.string()).query(async ({ input }) => {
      return await quoteCustomerService.getByQuoteId(input);
    }),

    create: t.procedure
      .input(
        z.object({
          quoteId: z.string(),
          customerId: z.string(),
          name: z.string().nullable().optional(),
          phoneNumber: z.string(),
          address: z.string().nullable().optional(),
          taxId: z.string().nullable().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return await quoteCustomerService.createQuoteCustomer(input);
      }),

    update: t.procedure
      .input(
        z.object({
          id: z.string(),
          data: z.object({
            name: z.string().optional(),
            taxId: z.string().optional(),
            phoneNumber: z.string().optional(),
            address: z.string().optional(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        return await quoteCustomerService.updateQuoteCustomer(
          input.id,
          input.data,
        );
      }),

    delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
      return await quoteCustomerService.deleteQuoteCustomer(input);
    }),
  }),
});

export type AppRouter = typeof appRouter;
