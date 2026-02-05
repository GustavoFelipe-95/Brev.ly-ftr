import { Either, makeLeft, makeRight } from "@/shared/either";
import { NotFoundLinkError } from "./errors/invalid-file-format";
import z from "zod";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { db } from "@/infra/db";

const deleteLinkInput = z.object({
  code: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(input: DeleteLinkInput): Promise<Either<NotFoundLinkError, unknown>> {
  const { code } = deleteLinkInput.parse(input);

  const link = await db.query.short_links.findFirst({
    where: eq(schema.short_links.shortenedLink, code),
  });

  if (!link) {
    return makeLeft(new NotFoundLinkError("shortenedLink", code));
  }

  await db.delete(schema.short_links).where(eq(schema.short_links.shortenedLink, code));

  return makeRight({});
}

