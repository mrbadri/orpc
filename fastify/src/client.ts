import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { AppRouter } from "./contract";

const DEFAULT_PORT = 3001;
const SERVER_PORT = Number(process.env.PORT) || DEFAULT_PORT;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

const link = new RPCLink({
  url: SERVER_URL,
  headers: { Authorization: "Bearer token" },
});

export const orpc: RouterClient<AppRouter> = createORPCClient(link);

(async () => {
  const res = await orpc.hello({ name: "Mohammadreza" });
  console.log(res); // { message: "Hello, Mohammadreza!" }
})();
