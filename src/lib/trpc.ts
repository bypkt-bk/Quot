import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "../server/trpc";

import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://quot-vert.vercel.app/api/trpc",
    }),
  ],
});
