import fastify from "fastify";
// Fixing the import by using a relative path instead of the alias
// Assuming the function is in a file like "../../../packages/zapi/index.ts"
import { myApiFunction } from "@test-monorepo/zapi/src/index";

myApiFunction();

const server = fastify({
  logger: true,
});

// Hello route
server.get("/hello", async (request, reply) => {
  return { message: "Hello from Fastify!" };
});

const start = async () => {
  try {
    await server.listen({ port: 3008, host: "0.0.0.0" });
    console.log("Server is running on http://localhost:3008");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
