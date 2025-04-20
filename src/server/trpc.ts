import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { StoresService } from "./services/stores.service";
import { ProductsService } from "./services/products.service";
import { QuotesProductService } from "./services/quoteproduct.service";
import { CustomersService } from "./services/customers.service";
import { QuotesService } from "./services/quotes.service";
import { QuoteCustomerService } from "./services/quotecustomers.service";
import { UserRepository } from "./infrastructure/prisma/user.repository";
import { UsersService } from "./services/users.service";
import { StoreRepository } from "./infrastructure/prisma/store.repository";
import { QuoteRepository } from "./infrastructure/prisma/quote.repository";
import { CustomerRepository } from "./infrastructure/prisma/customer.repository";
import { QuoteCustomerRepository } from "./infrastructure/prisma/quotecustomer.repository";
import { QuoteProductRepository } from "./infrastructure/prisma/quoteproduct.repository";
import { ProductRepository } from "./infrastructure/prisma/product.repository";
import { PaymentType } from "./domain/enums/payment-type.enum";
import { Status } from "./domain/enums/status.enum";

const t = initTRPC.create();

// Repository instances
const userRepository = new UserRepository();
const storeRepository = new StoreRepository();
const customerRepository = new CustomerRepository();
const quoteCustomerRepository = new QuoteCustomerRepository();
const quoteProductRepository = new QuoteProductRepository();
const quoteRepository = new QuoteRepository();
const productRepository = new ProductRepository();

// Service instances
const usersService = new UsersService(userRepository);
const storesService = new StoresService(storeRepository);
const productsService = new ProductsService(productRepository);
const customersService = new CustomersService(customerRepository);
const quoteproductService = new QuotesProductService(quoteProductRepository);
const quoteCustomerService = new QuoteCustomerService(quoteCustomerRepository);
const quoteService = new QuotesService(quoteRepository);

export const appRouter = t.router({
  user: t.router({
    getByGoogleId: t.procedure
      .input(z.string())
      .query(({ input }) => usersService.getUserByGoogleId(input)),
      
    getById: t.procedure
      .input(z.string())
      .query(({ input }) => usersService.getUserById(input)),

    create: t.procedure
      .input(z.object({
        name: z.string(),
        email: z.string(),
        googleId: z.string()
      }))
      .mutation(({ input }) => usersService.createUser(input.name, input.email, input.googleId)),

    update: t.procedure
      .input(z.object({
        googleId: z.string(),
        name: z.string(),
        email: z.string().optional(),
        taxId: z.string().optional(),
        phoneNumber: z.string().optional()
      }))
      .mutation(({ input }) => usersService.updateUser(
        input.googleId,
        input.name,
        input.email,
        input.taxId,
        input.phoneNumber
      ))
  }),

  store: t.router({
    getById: t.procedure
    .input(z.string())
      .query(({ input }) => storesService.getStoreById(input)),

    getByOwnerId: t.procedure
    .input(z.string())
      .query(({ input }) => storesService.getStoreByOwnerId(input)),

    create: t.procedure
      .input(z.object({
        name: z.string(),
        address: z.string(),
        ownerIds: z.array(z.string()),
        revenue: z.number().optional(),
        adminIds: z.array(z.string()).optional()
      }))
      .mutation(({ input }) => storesService.createStore(
        input.name,
        input.address,
        input.ownerIds,
        input.revenue,
        input.adminIds
      )),

    update: t.procedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          address: z.string().optional(),
          revenue: z.number().optional()
        })
      }))
      .mutation(({ input }) => storesService.updateStore(input.id, input.data)),

    updateOwners: t.procedure
      .input(z.object({
        id: z.string(),
        newOwnerIds: z.array(z.string())
      }))
      .mutation(({ input }) => storesService.updateStoreOwner(input.id, input.newOwnerIds.map(Number))),

    incrementRevenue: t.procedure
      .input(z.object({
        storeId: z.string(),
        revenue: z.number()
      }))
      .mutation(({ input }) => storesService.incrementRevenue(input.storeId, input.revenue)),

    decreaseRevenue: t.procedure
      .input(z.object({
        storeId: z.string(),
        revenue: z.number()
      }))
      .mutation(({ input }) => storesService.decreaseRevenue(input.storeId, input.revenue))
  }),

  product: t.router({
    getByStore: t.procedure
    .input(z.string())
      .query(({ input }) => productsService.getStoreProducts(input)),

    create: t.procedure
      .input(z.object({
        storeId: z.string(),
        name: z.string(),
        price: z.number()
      }))
      .mutation(({ input }) => productsService.createProduct(input.storeId, input.name, input.price)),

    update: t.procedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          price: z.number().optional()
        })
      }))
      .mutation(({ input }) => productsService.updateProduct(input.id, input.data)),

    delete: t.procedure
    .input(z.string())
      .mutation(({ input }) => productsService.deleteProduct(input))
  }),

  customer: t.router({
    getByStore: t.procedure
    .input(z.string())
      .query(({ input }) => customersService.getStoreCustomers(input)),

    getByStoreIdAndPhone: t.procedure
      .input(z.object({
        storeId: z.string(),
        phoneNumber: z.string()
      }))
      .query(({ input }) => customersService.getCustomerByStoreIdAndPhone(input.storeId, input.phoneNumber)),

    create: t.procedure
      .input(z.object({
        storeId: z.string(),
        name: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        taxId: z.string()
      }))
      .mutation(({ input }) => customersService.createCustomer(
        input.storeId,
        input.name,
        input.phoneNumber,
        input.address,
        input.taxId
      )),

    update: t.procedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional().nullable(),
          address: z.string().optional().nullable(),
          phoneNumber: z.string(),
          taxId: z.string().optional().nullable()
        })
      }))
      .mutation(({ input }) => customersService.updateCustomer(input.id, input.data)),

    delete: t.procedure
    .input(z.string())
      .mutation(({ input }) => customersService.deleteCustomer(input))
  }),

  quote: t.router({
    getById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await quoteService.getQuoteById(input.id, {
        include: { store: true }
      });
    }),
    create: t.procedure
      .input(z.object({
        storeId: z.string(),
        customerId: z.string(),
        products: z.array(z.object({
          productId: z.string(),
          productName: z.string(),
          unitPrice: z.number(),
          quantity: z.number()
        })),
        orderDate: z.string(),
        type: z.enum(['CASH', 'CREDIT']),
        status: z.nativeEnum(Status),
        address: z.string().optional(),
        shippingOn: z.string().nullable().optional(),
        creditTerm: z.number().optional()
      }))
      .mutation(({ input }) => quoteService.createQuote(
        input.storeId,
        input.customerId,
        input.products,
        input.orderDate,
        input.type === 'CASH' ? PaymentType.cash : PaymentType.credit,
        input.status === Status.unpaid ? Status.unpaid : Status.paid,
        input.address,
        input.shippingOn,
        input.creditTerm
      )),

    markAsPaid: t.procedure
      .input(z.object({
        id: z.string(),
        status: z.nativeEnum(Status)
      }))
      .mutation(({ input }) => quoteService.markAsPaid(input.id, input.status)),

    updateOrderOnAndShippingOn: t.procedure
      .input(z.object({
        id: z.string(),
        orderDate: z.string(),
        shippingOn: z.string().nullable().optional()
      }))
      .mutation(({ input }) => quoteService.updateOrderOnAndShippingOn(
        input.id,
        input.orderDate,
        input.shippingOn
      )),

    updateTotal: t.procedure
      .input(z.object({
        id: z.string(),
        total: z.number()
      }))
      .mutation(({ input }) => quoteService.updateTotal(input.id, input.total)),

    delete: t.procedure
    .input(z.string())
      .mutation(({ input }) => quoteService.deleteQuote(input)),

    updatePaymentType: t.procedure
      .input(z.object({
        id: z.string(),
        type: z.enum(['cash', 'creditterm']),
        creditTerm: z.number().nullable().optional()
      }))
      .mutation(({ input }) => quoteService.updatePaymentType(
        input.id,
        input.type === 'cash' ? PaymentType.cash : PaymentType.credit,
        input.creditTerm
      ))
  }),

  quoteProduct: t.router({
    create: t.procedure
      .input(z.object({
        quoteId: z.string(),
        productId: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
        productName: z.string()
      }))
      .mutation(({ input }) => quoteproductService.createQuoteProduct(
        input.quoteId,
        input.productId,
        input.quantity,
        input.unitPrice,
        input.productName
      )),

    update: t.procedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          quantity: z.number().optional(),
          price: z.number().optional(),
          unitPrice: z.number().optional(),
          productName: z.string().optional()
        })
      }))
      .mutation(({ input }) => quoteproductService.updateQuoteProduct(input.id, input.data)),

    deleteQuoteProduct: t.procedure
      .input(z.object({
        quoteId: z.string(),
        productId: z.string()
      }))
      .mutation(({ input }) => quoteproductService.deleteQuoteProductById(input.quoteId, input.productId))
  }),

  quoteCustomer: t.router({
    create: t.procedure
      .input(z.object({
        quoteId: z.string(),
        customerId: z.string(),
        name: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        taxId: z.string()
      }))
      .mutation(({ input }) => quoteCustomerService.createQuoteCustomer(
        input.quoteId,
        input.customerId,
        input.name,
        input.phoneNumber,
        input.address,
        input.taxId
      )),

    update: t.procedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          taxId: z.string().optional(),
          phoneNumber: z.string().optional(),
          address: z.string().optional()
        })
      }))
      .mutation(({ input }) => quoteCustomerService.updateQuoteCustomer(input.id, input.data))
  })
});

export type AppRouter = typeof appRouter;