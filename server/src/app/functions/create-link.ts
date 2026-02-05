import { z } from 'zod'
import { InvalidFileFormatError } from './errors/invalid-file-format'
import { Either, makeLeft, makeRight } from '@/shared/either'
import { isValidShortLink } from './utils/validationShortLink'
import { schema } from '@/infra/db/schemas'
import { db } from '@/infra/db'
import { eq } from 'drizzle-orm'

const linkInput = z.object({
  originalURL: z.string(),
  shortURL: z.string(),
})

type linkOutput = {
  id: string,
}

type LinkInput = z.input<typeof linkInput>

export async function createLink(
  input: LinkInput
): Promise<Either<InvalidFileFormatError, linkOutput>> {
  const { originalURL, shortURL } = linkInput.parse(input);

  const isValidURL = isValidShortLink(shortURL);

  if (!isValidURL) {
    return makeLeft(new InvalidFileFormatError());
  }

  const existingLink = await db
    .select()
    .from(schema.short_links)
    .where(eq(schema.short_links.shortenedLink, shortURL));

  if (existingLink.length > 0) {
    return makeLeft(new InvalidFileFormatError())
  }

  const result = await db.insert(schema.short_links).values({
    originalLink: originalURL,
    shortenedLink: shortURL,
    accessCount: 0,
  }).returning();

  return makeRight({
    id: result[0].id,
  })
}