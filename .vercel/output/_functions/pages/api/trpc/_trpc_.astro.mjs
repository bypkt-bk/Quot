import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
export { renderers } from '../../../renderers.mjs';

const prisma$3 = new PrismaClient();
const usersModel = {
  async getUser() {
    return await prisma$3.user.findMany();
  },
  async getUserByGoogleId(id) {
    return await prisma$3.user.findUnique({
      where: { id }
    });
  },
  async createUser(name, email, googleId) {
    return await prisma$3.user.create({
      data: {
        name,
        email,
        googleId
      }
    });
  },
  async updateUser(id, name, email, taxId, phoneNumber) {
    return await prisma$3.user.update({
      where: { id },
      data: {
        name,
        ...email && { email },
        ...taxId && { taxId },
        ...phoneNumber && { phoneNumber }
      }
    });
  },
  async deleteUser(id) {
    return await prisma$3.user.delete({
      where: { id }
    });
  }
};

const usersService = {
  async getUsers() {
    return await usersModel.getUser();
  },
  async getUserByGoogleId(id) {
    return await usersModel.getUserByGoogleId(id);
  },
  async createUser(name, email, googleId) {
    return await usersModel.createUser(name, email, googleId);
  },
  async updateUser(id, name, email, taxId, phoneNumber) {
    return await usersModel.updateUser(id, name, email, taxId, phoneNumber);
  },
  async deleteUser(id) {
    return await usersModel.deleteUser(id);
  }
};

const prisma$2 = new PrismaClient();
const productsModel = {
  async getProducts() {
    return await prisma$2.product.findMany();
  },
  async getProductById(id) {
    return await prisma$2.product.findUnique({
      where: { id }
    });
  },
  async createProduct(name, price) {
    return await prisma$2.product.create({
      data: {
        name,
        price
      }
    });
  },
  async updateProduct(id, name, price) {
    return await prisma$2.product.update({
      where: { id },
      data: {
        name,
        price
      }
    });
  },
  async deleteProduct(id) {
    return await prisma$2.product.delete({
      where: { id }
    });
  }
};

const productsService = {
  async getProducts() {
    return await productsModel.getProducts();
  },
  async getProductById(id) {
    return await productsModel.getProductById(id);
  },
  async createProduct(name, price) {
    return await productsModel.createProduct(name, price);
  },
  async updateProduct(id, name, price) {
    return await productsModel.updateProduct(id, name, price);
  },
  async deleteProduct(id) {
    return await productsModel.deleteProduct(id);
  }
};

const prisma$1 = new PrismaClient();
const quoteModel = {
  async getQuotes() {
    return await prisma$1.quote.findMany({
      include: {
        customer: true,
        store: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
  },
  async getQuoteById(id) {
    return await prisma$1.quote.findUnique({
      where: { id },
      include: {
        customer: true,
        store: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
  },
  async createQuote(total, orderDate, customerId, storeId, status, shippingOn) {
    return await prisma$1.quote.create({
      data: {
        total,
        orderDate,
        status,
        customerId,
        storeId,
        ...shippingOn && { shippingOn }
      }
    });
  },
  async updateQuote(id, data) {
    return await prisma$1.quote.update({
      where: { id },
      data
    });
  },
  async deleteQuote(id) {
    return await prisma$1.quote.delete({
      where: { id }
    });
  }
};

const quoteService = {
  async getAllQuotes() {
    try {
      return await quoteModel.getQuotes();
    } catch (error) {
      throw new Error("Error fetching quotes: " + error);
    }
  },
  async getQuoteById(id) {
    try {
      const quote = await quoteModel.getQuoteById(id);
      if (!quote) {
        throw new Error(`Quote with ID ${id} not found`);
      }
      return quote;
    } catch (error) {
      throw new Error("Error fetching quote: " + error);
    }
  },
  async createQuote(total, orderDate, customerId, storeId, status, shippingOn) {
    try {
      return await quoteModel.createQuote(
        total,
        orderDate,
        customerId,
        storeId,
        status,
        shippingOn
      );
    } catch (error) {
      throw new Error("Error creating quote: " + error);
    }
  },
  async updateQuote(id, data) {
    try {
      return await quoteModel.updateQuote(id, data);
    } catch (error) {
      throw new Error("Error updating quote: " + error);
    }
  },
  async deleteQuote(id) {
    try {
      return await quoteModel.deleteQuote(id);
    } catch (error) {
      throw new Error("Error deleting quote: " + error);
    }
  }
};

const prisma = new PrismaClient();
const storeModel = {
  async getStores() {
    return await prisma.store.findMany({
      include: {
        owner: true,
        admin: true,
        quote: true
      }
    });
  },
  async getStoreById(id) {
    return await prisma.store.findUnique({
      where: { id },
      include: {
        owner: true,
        admin: true,
        quote: true
      }
    });
  },
  async createStore(name, address, revenue) {
    return await prisma.store.create({
      data: {
        name,
        address,
        revenue
      }
    });
  },
  async updateStore(id, name, address, revenue) {
    return await prisma.store.update({
      where: { id },
      data: {
        ...name && { name },
        ...address && { address },
        ...revenue !== void 0 && { revenue }
      }
    });
  },
  async deleteStore(id) {
    return await prisma.store.delete({
      where: { id }
    });
  }
};

const storesService = {
  async getStores() {
    return await storeModel.getStores();
  },
  async getStoreById(id) {
    return await storeModel.getStoreById(id);
  },
  async createStore(name, address, revenue) {
    return await storeModel.createStore(name, address, revenue);
  },
  async updateStore(id, name, address, revenue) {
    return await storeModel.updateStore(id, name, address, revenue);
  },
  async deleteStore(id) {
    return await storeModel.deleteStore(id);
  }
};

const t = initTRPC.create();
const appRouter = t.router({
  getUsers: t.procedure.query(async () => {
    return usersService.getUsers();
  }),
  getUserById: t.procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    return usersService.getUserByGoogleId(opts.input.id);
  }),
  createUser: t.procedure.input(z.object({ name: z.string(), email: z.string(), googleId: z.string() })).mutation(async (opts) => {
    return usersService.createUser(opts.input.name, opts.input.email, opts.input.googleId);
  }),
  updateUser: t.procedure.input(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().optional(),
      taxId: z.string().optional(),
      phoneNumber: z.string().optional()
    })
  ).mutation(async (opts) => {
    return usersService.updateUser(
      opts.input.id,
      opts.input.name,
      opts.input.email,
      opts.input.taxId,
      opts.input.phoneNumber
    );
  }),
  deleteUser: t.procedure.input(z.object({ id: z.number() })).mutation(async (opts) => {
    return usersService.deleteUser(opts.input.id);
  }),
  getProducts: t.procedure.query(async () => {
    return productsService.getProducts();
  }),
  getProductById: t.procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    return productsService.getProductById(opts.input.id);
  }),
  createProduct: t.procedure.input(z.object({ name: z.string(), price: z.number(), stock: z.number() })).mutation(async (opts) => {
    return productsService.createProduct(opts.input.name, opts.input.price);
  }),
  updateProduct: t.procedure.input(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      price: z.number().optional(),
      stock: z.number().optional()
    })
  ).mutation(async (opts) => {
    return productsService.updateProduct(
      opts.input.id,
      opts.input.name,
      opts.input.price
    );
  }),
  deleteProduct: t.procedure.input(z.object({ id: z.number() })).mutation(async (opts) => {
    return productsService.deleteProduct(opts.input.id);
  }),
  getQuotes: t.procedure.query(async () => {
    return quoteService.getAllQuotes();
  }),
  getQuoteById: t.procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    return quoteService.getQuoteById(opts.input.id);
  }),
  createQuote: t.procedure.input(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      total: z.number(),
      orderDate: z.string(),
      customerId: z.number(),
      storeId: z.number(),
      status: z.enum(["unpaid", "paid"]),
      shippingOn: z.string().optional()
    })
  ).mutation(async (opts) => {
    return quoteService.createQuote(
      opts.input.total,
      opts.input.orderDate,
      opts.input.customerId,
      opts.input.storeId,
      opts.input.status,
      opts.input.shippingOn
    );
  }),
  updateQuote: t.procedure.input(
    z.object({
      id: z.number(),
      total: z.number().optional(),
      orderDate: z.string().optional(),
      shippingOn: z.string().optional(),
      status: z.enum(["unpaid", "paid"]).optional()
    })
  ).mutation(async (opts) => {
    return quoteService.updateQuote(
      opts.input.id,
      {
        total: opts.input.total,
        orderDate: opts.input.orderDate,
        shippingOn: opts.input.shippingOn,
        status: opts.input.status
      }
    );
  }),
  deleteQuote: t.procedure.input(z.object({ id: z.number() })).mutation(async (opts) => {
    return quoteService.deleteQuote(opts.input.id);
  }),
  getStores: t.procedure.query(async () => {
    return storesService.getStores();
  }),
  getStoreById: t.procedure.input(z.object({ id: z.number() })).query(async (opts) => {
    return storesService.getStoreById(opts.input.id);
  }),
  createStore: t.procedure.input(z.object({ name: z.string(), location: z.string(), revenue: z.number() })).mutation(async (opts) => {
    return storesService.createStore(opts.input.name, opts.input.location, opts.input.revenue);
  }),
  updateStore: t.procedure.input(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      location: z.string().optional()
    })
  ).mutation(async (opts) => {
    return storesService.updateStore(
      opts.input.id,
      opts.input.name,
      opts.input.location
    );
  }),
  deleteStore: t.procedure.input(z.object({ id: z.number() })).mutation(async (opts) => {
    return storesService.deleteStore(opts.input.id);
  })
});

const prerender = false;
const ALL = async ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    ALL,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
