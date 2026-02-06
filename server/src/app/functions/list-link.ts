import { Either, makeRight } from "@/shared/either";
import { schema } from "@/infra/db/schemas";
import { db } from "@/infra/db";

type outputLink = {
  links: {
    id: string;
    originalLink: string;
    shortenedLink: string;
    accessCount: number;
  }[];
}

export async function listLinks(): Promise<Either<never, outputLink>> {
  const links = await db.select().from(schema.short_links).orderBy(schema.short_links.createdAt);
  
  const result = links.length > 0 ?  links.map(link => ({
    id: link.id,
    originalLink: link.originalLink,
    shortenedLink: link.shortenedLink,
    accessCount: Number(link.accessCount)
  })) : [];

  return makeRight({
    links: result,
  });
}

