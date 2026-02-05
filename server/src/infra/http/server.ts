import { env } from "@/env";
import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import { healthCheckRoute } from "./routes/helth-check";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { listLinkRoute } from "./routes/get-links";
import { findOneShortLinkRoute } from "./routes/get-original-link-by-short-link";

const server = fastify()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  return reply.status(500).send({
    message: "Internal server error.",
  });
});

server.register(fastifyCors, { origin: '*' })
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Upload Server API",
      version: "1.0.0",
      description: "API for Upload Server",
      summary: "Upload Server API documentation",
      contact: {
        name: "Gustavo Felipe",
        email: "zegustavo149@gmail.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/license/mit/",
      },
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(healthCheckRoute);
server.register(listLinkRoute);
server.register(findOneShortLinkRoute);
server.register(createLinkRoute);
server.register(deleteLinkRoute);

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running on http://localhost:${env.PORT}`)
})