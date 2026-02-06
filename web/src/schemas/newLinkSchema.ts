import { z } from 'zod';

export const newLinkSchema = z.object({
  originalLink: z
    .string({ message: 'O link é obrigatória' })
    .min(1, 'O link é obrigatória')
    .trim(),
  shortenedLink: z
    .string({ message: 'O link encurtado é obrigatório' })
    .trim()
    .min(3, 'O link encurtado deve ter no mínimo 3 caracteres')
    .max(50, 'O link encurtado deve ter no máximo 50 caracteres')
});