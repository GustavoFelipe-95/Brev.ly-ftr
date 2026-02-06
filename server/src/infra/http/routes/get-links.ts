import { listLinks } from "@/app/functions/list-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const listLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get('/', {
    schema: {
      summary: "List Links",
      description: "Retrieves a list of short links.",
      tags: ["Short Links"],
      response: {
        200: z.object({
          links: z.array(
            z.object({
              id: z.string(),
              shortenedLink: z.string(),
              originalLink: z.string(),
              accessCount: z.number(),
            })
          ),
        }),
        500: z.object({
          message: z.string(),
        }),
      }
    }
  }, async (request, reply) => {
    const result = await listLinks();

    if (isRight(result)) {
      const {links} = unwrapEither(result);
      return reply.status(200).send({ links });
    }

    throw new Error("Unhandled error in listing links");
  });
}
