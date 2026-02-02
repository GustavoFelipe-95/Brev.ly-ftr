import { z } from 'zod';

export const newLinkSchema = z.object({
  originalLink: z
    .string({ message: 'URL é obrigatória' })
    .min(1, 'URL é obrigatória')
    .trim(),
  shortenedLink: z
    .string({ message: 'Slug é obrigatório' })
    .trim()
    .min(3, 'Slug deve ter no mínimo 3 caracteres')
    .max(50, 'Slug deve ter no máximo 50 caracteres')
});