import { deleteLink } from "@/app/functions/delete-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/:code', {
    schema: {
      summary: "Delete Link",
      description: "Deletes an existing short link.",
      tags: ["Short Links"],
      params: z.object({
        code: z.string(),
      }),
      response: {
        204: z.null(),
        404: z.object({
          statusCode: z.number(),
          name: z.string(),
          message: z.string(),
          field: z.string(),
          value: z.string(),

        }),
        400: z.object({
          message: z.string(),
        }),
        500: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (request, reply) => {
    const { code } = request.params;

    const result = await deleteLink({ code });

    if (isRight(result)) {
      return reply.status(204).send(null);
    }

    const { statusCode, message, name, field, value } = unwrapEither(result);
    if (statusCode === 404) {
      return reply.status(404).send({
        statusCode,
        name,
        message,
        field,
        value,
      });
    } else if (statusCode === 400) {
      return reply.status(400).send({ message });
    } else if (statusCode === 500) {
      return reply.status(500).send({ message: "Internal server error." });
    } else {
      throw new Error("Unhandled error status code");
    }
  });
}
