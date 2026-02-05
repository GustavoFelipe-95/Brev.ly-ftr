import { Either, makeLeft, makeRight } from "@/shared/either";
import { schema } from "@/infra/db/schemas";
import { db } from "@/infra/db";
import z from "zod";
import { NotFoundLinkError } from "./errors/invalid-file-format";
import { eq } from "drizzle-orm";

const shortLinkInputSchema = z.object({
  shortenedLink: z.string().min(3).max(20),
});

type shortLinkInput = z.input<typeof shortLinkInputSchema>;
type outputLink = {
  originalLink: string;
  accessCount: number;
}

export async function findOneShortLink(code: shortLinkInput): Promise<Either<NotFoundLinkError, outputLink>> {
  const { shortenedLink } = shortLinkInputSchema.parse(code);

  const linkObtained = await db.query.short_links.findFirst({
    where: eq(schema.short_links.shortenedLink, shortenedLink),
  });

  if (!linkObtained) {
    return makeLeft(new NotFoundLinkError("shortenedLink", shortenedLink));
  }

  const [updatedLinks] = await Promise.all([
    db
      .update(schema.short_links)
      .set({
        accessCount: Number(linkObtained.accessCount) + 1,
      })
      .where(eq(schema.short_links.shortenedLink, shortenedLink))
      .returning(),
  ]);

  const incrementedAccessCount = updatedLinks[0];

  return makeRight({
    originalLink: linkObtained.originalLink,
    accessCount: Number(incrementedAccessCount.accessCount),
  });
}

