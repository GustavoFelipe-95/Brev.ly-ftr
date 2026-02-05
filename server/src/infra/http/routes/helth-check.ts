import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const healthCheckRoute: FastifyPluginAsyncZod = async server => {
    server.get("/health-check", {
        schema: {
            summary: "Health Check",
            description: "Verifies if the server is running.",
            tags: ["Health"],
            response: {
                200: z.object({
                    status: z.string(),
                }),
            },
        },
    }, async (_, reply) => {
        return reply.status(200).send({ status: "OK" });
    });
}
