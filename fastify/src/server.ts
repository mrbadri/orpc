import { createServer } from "node:http";
import Fastify from "fastify";
import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { appRouter } from "./contract";

const DEFAULT_PORT = 3001;
// const RPC_PREFIX = "/rpc";
const SERVER_PORT = Number(process.env.PORT) || DEFAULT_PORT;

const handler = new RPCHandler(appRouter, {
  plugins: [new CORSPlugin()],
});

const fastify = Fastify({
  logger: true,
  serverFactory: (fastifyHandler) => {
    const server = createServer(async (req, res) => {
      const { matched } = await handler.handle(req, res, {
        context: {},
        // prefix: RPC_PREFIX,
      });

      if (matched) {
        return;
      }

      fastifyHandler(req, res);
    });

    return server;
  },
});

try {
  await fastify.listen({ port: SERVER_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
