import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { usersService } from "./services/users.service";
import { productsService } from "./services/products.service";
import { quoteService } from "./services/quotes.service";
import { storesService } from "./services/stores.service";

const t = initTRPC.create();

export const appRouter = t.router({
  getUsers: t.procedure.query(async () => {
    return usersService.getUsers();
  }),
  getUserById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      return usersService.getUserByGoogleId(opts.input.id);
    }),
  getUserByGoogleId: t.procedure
    .input(z.object({ googleId: z.string() }))
    .query(async (opts) => {
      return usersService.getUserByGoogleId(opts.input.googleId);
    }),
  createUser: t.procedure
    .input(
      z.object({ name: z.string(), email: z.string(), googleId: z.string() }),
    )
    .mutation(async (opts) => {
      return usersService.createUser(
        opts.input.name,
        opts.input.email,
        opts.input.googleId,
      );
    }),
  updateUser: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().optional(),
        taxId: z.string().optional(),
        phoneNumber: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      return usersService.updateUser(
        opts.input.id,
        opts.input.name,
        opts.input.email,
        opts.input.taxId,
        opts.input.phoneNumber,
      );
    }),
  deleteUser: t.procedure
    .input(z.object({ googleId: z.string() }))
    .mutation(async (opts) => {
      return usersService.deleteUser(opts.input.googleId);
    }),
  getProducts: t.procedure.query(async () => {
    return productsService.getProducts();
  }),
  getProductById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      return productsService.getProductById(opts.input.id);
    }),
  createProduct: t.procedure
    .input(z.object({ name: z.string(), price: z.number(), stock: z.number() }))
    .mutation(async (opts) => {
      return productsService.createProduct(opts.input.name, opts.input.price);
    }),
  updateProduct: t.procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
      }),
    )
    .mutation(async (opts) => {
      return productsService.updateProduct(
        opts.input.id,
        opts.input.name,
        opts.input.price,
      );
    }),
  deleteProduct: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      return productsService.deleteProduct(opts.input.id);
    }),
  getQuotes: t.procedure.query(async () => {
    return quoteService.getAllQuotes();
  }),
  getQuoteById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      return quoteService.getQuoteById(opts.input.id);
    }),
  createQuote: t.procedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
        total: z.number(),
        orderDate: z.string(),
        customerId: z.number(),
        storeId: z.number(),
        status: z.enum(["unpaid", "paid"]),
        shippingOn: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      return quoteService.createQuote(
        opts.input.total,
        opts.input.orderDate,
        opts.input.customerId,
        opts.input.storeId,
        opts.input.status,
        opts.input.shippingOn,
      );
    }),
  updateQuote: t.procedure
    .input(
      z.object({
        id: z.number(),
        total: z.number().optional(),
        orderDate: z.string().optional(),
        shippingOn: z.string().optional(),
        status: z.enum(["unpaid", "paid"]).optional(),
      }),
    )
    .mutation(async (opts) => {
      return quoteService.updateQuote(opts.input.id, {
        total: opts.input.total,
        orderDate: opts.input.orderDate,
        shippingOn: opts.input.shippingOn,
        status: opts.input.status,
      });
    }),
  deleteQuote: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      return quoteService.deleteQuote(opts.input.id);
    }),
  getStores: t.procedure.query(async () => {
    return storesService.getStores();
  }),
  getStoreById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      return storesService.getStoreById(opts.input.id);
    }),
  createStore: t.procedure
    .input(
      z.object({ name: z.string(), location: z.string(), revenue: z.number() }),
    )
    .mutation(async (opts) => {
      return storesService.createStore(
        opts.input.name,
        opts.input.location,
        opts.input.revenue,
      );
    }),
  updateStore: t.procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        location: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      return storesService.updateStore(
        opts.input.id,
        opts.input.name,
        opts.input.location,
      );
    }),
  deleteStore: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      return storesService.deleteStore(opts.input.id);
    }),
});

export type AppRouter = typeof appRouter;
