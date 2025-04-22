import fastify from "fastify";
// Fixing the import by using a relative path instead of the alias
// Assuming the function is in a file like "../../../packages/zapi/index.ts"
import { prisma } from "@test-monorepo/db/src/index";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const server = fastify({
  logger: false,
});

// Hello route
server.get("/test", async (request, reply) => {
  const users = await prisma.user.findMany();
  return { users };
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
