import { exportCSV } from "@/app/functions/export-csv";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const exportCSVRoute: FastifyPluginAsyncZod = async server => {
    server.get('/export', {
        schema: {
            summary: "Export Links as CSV",
            description: "Exports all short links and their details as a CSV file.",
            tags: ["Short Links"],
            response: {
                200: z.object({
                    reportUrl: z.string().url(),
                }),
                500: z.object({
                    message: z.string(),
                }),
            }
        }
    }, async (request, reply) => {
        try {
            const result = await exportCSV();
            if (isRight(result)) {
                const { reportUrl } = unwrapEither(result);
                return reply.status(200).send({ reportUrl });
            }
            const { message } = unwrapEither(result);
            return reply.status(500).send({ message });
        } catch (error) {
            return reply.status(500).send({ message: "Internal server error." });
        }
    });
}