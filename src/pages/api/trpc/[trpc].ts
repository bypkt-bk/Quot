<<<<<<< HEAD
<<<<<<< HEAD
export const prerender = false; // Disable static generation for this API route

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../server/trpc";

export const ALL = async ({ request }: { request: Request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });
};
=======
=======
export const prerender = false; // Disable static generation for this API route

>>>>>>> cb3c65e (fix: build app)
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../server/trpc";

export const ALL = async ({ request }: { request: Request }) => {
<<<<<<< HEAD
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req: request,
		router: appRouter,
	});
};
>>>>>>> 5f18958 (feat: api)
=======
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });
};
>>>>>>> cb3c65e (fix: build app)
