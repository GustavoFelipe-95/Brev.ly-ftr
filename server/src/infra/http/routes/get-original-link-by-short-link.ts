import { findOneShortLink } from "@/app/functions/find-one-short-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const findOneShortLinkRoute: FastifyPluginAsyncZod = async server => {
    server.get('/:code', {
        schema: {
            summary: "Find One Short Link",
            description: "Retrieves a short link by its code.",
            tags: ["Short Links"],
            params: z.object({
                code: z.string(),
            }),
            response: {
                200: z.object({
                    originalLink: z.string(),
                    accessCount: z.number(),
                }),
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

        const result = await findOneShortLink({shortenedLink: code});

        if (isRight(result)) {
            const { originalLink, accessCount } = unwrapEither(result);
            return reply.status(200).send({ originalLink, accessCount });
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
