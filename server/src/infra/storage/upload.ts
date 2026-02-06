import { Upload } from "@aws-sdk/lib-storage";
import { configR2Storage } from "./config-r2-storage";
import z from "zod";
import { Readable } from "node:stream";
import { basename, extname } from "node:path";
import { randomUUID } from "node:crypto";
import { env } from "@/env";

const uploadFileToStorage = z.object({
  folder: z.enum(["reports"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable)
});

type UploadFileToStorageInput = z.infer<typeof uploadFileToStorage>;

type UploadFileToStorageOutput = {
  key: string;
  url: string;
}

export async function uploadToStorage(input: UploadFileToStorageInput): Promise<UploadFileToStorageOutput> {
  const {
    folder,
    fileName,
    contentType,
    contentStream
  } = uploadFileToStorage.parse(input);

  const fileNameOriginalExtension = extname(fileName);
  const baseFileName = basename(fileName);
  const sanitizedBaseFileName = baseFileName.replace(/[^a-zA-Z0-9-_]/g, '');
  const sanitizedBaseFileNameWhithoutExtension = sanitizedBaseFileName.concat(fileNameOriginalExtension);
  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedBaseFileNameWhithoutExtension}`;

  const upload = new Upload({
    client: configR2Storage,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET_NAME!,
      Key: uniqueFileName,
      Body: contentStream,
      ContentType: contentType
    }
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString()
  }
}