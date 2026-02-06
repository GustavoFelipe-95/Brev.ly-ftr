import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post("/", {
        schema: {
            summary: "Create Link",
            description: "Creates a new short link.",
            tags: ["Short Links"],
            body: z.object({
                originalURL: z.string(),
                shortURL: z.string(),
            }),
            response: {
                201: z.object({
                    id: z.string(),
                    originalLink: z.string(),   
                    shortenedLink: z.string(),
                    accessCount: z.number(),
                }),
                400: z.object({
                    message: z.string(),
                }),
            },
        },
    }, async (request, reply) => {
        const { originalURL, shortURL } = request.body as { originalURL: string, shortURL: string };

        const result = await createLink({ originalURL, shortURL });

        if(isRight(result)) {
            const itemObtained = unwrapEither(result);
            return reply.status(201).send({ id: itemObtained.id, originalLink: originalURL, shortenedLink: shortURL, accessCount: 0 });
        }

        const error = unwrapEither(result);
        return reply.status(400).send({ message: error.message });
    });
}
