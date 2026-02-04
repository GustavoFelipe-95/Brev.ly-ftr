import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string().refine((url) => url.startsWith("postgresql://"), {
    message: "DATABASE_URL must be a PostgreSQL connection string",
  }),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string(),
});

export const env = envSchema.parse(process.env);