import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";
import { PassThrough, Transform } from "node:stream";
import { stringify } from "csv-stringify";
import { pipeline } from "node:stream/promises";
import { uploadToStorage } from "@/infra/storage/upload";

type ExportCSVOutput = {
  reportUrl: string;
}

export async function exportCSV(): Promise<Either<never, ExportCSVOutput>> {
  let query = db.select({
    shortened_link: schema.short_links.shortenedLink,
    original_link: schema.short_links.originalLink,
    access_count: schema.short_links.accessCount,
    created_at: schema.short_links.createdAt,
  }).from(schema.short_links);

  const { sql, params } = query.toSQL();

  const cursor = pg.unsafe(sql, params as any[]).cursor(100);

  const csv = stringify({
    delimiter: ';',
    header: true,
    columns: [
      { key: 'shortened_link', header: 'URL encurtada' },
      { key: 'original_link', header: 'URL original' },
      { key: 'access_count', header: 'Contagem de Acessos' },
      { key: 'created_at', header: 'Data de Criacao' },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const converToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks, _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      }
    }),
    csv,
    uploadToStorageStream
  );

  const uploadStorage = uploadToStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: `short-links-report-${Date.now()}.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadStorage, converToCSVPipeline]);

  return makeRight({ reportUrl: url });
}