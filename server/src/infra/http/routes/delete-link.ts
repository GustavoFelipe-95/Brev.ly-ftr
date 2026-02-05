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
                code: z.string().describe("The short code of the link to be deleted"),
            }),
            response: {
                204: z.null().describe("No Content - Link successfully deleted"),
                404: z.object({
                    message: z.string().describe("Error message indicating that the link was not found"),
                }),
                400: z.object({
                    message: z.string().describe("Error message describing why the link deletion failed"),
                }),
                500: z.object({
                    message: z.string().describe("Error message indicating an internal server error"),
                }),
            }
        }
    }, async (request, reply) => {
        const { code } = request.params;

        const result = await deleteLink({ code });
        
        if (isRight(result)) {
            return reply.status(204).send(null);
        }

        const { statusCode, message } = unwrapEither(result);
        if (statusCode === 404) {
            return reply.status(404).send({ message });
        } else if (statusCode === 400) {
            return reply.status(400).send({ message });
        } else {
            return reply.status(500).send({ message: "Internal server error." });
        }
    });
}
