import { z } from 'zod';

// Regex para validar apenas caracteres alfanuméricos, hífens e underscores
const shortenedLinkRegex = /^[a-zA-Z0-9_-]+$/;

export const newLinkSchema = z.object({
  originalLink: z
    .string({ message: 'O link é obrigatório' })
    .min(1, 'O link é obrigatório')
    .trim()
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'O link deve ser uma URL válida (ex: https://exemplo.com)' }
    ),
  shortenedLink: z
    .string({ message: 'O link encurtado é obrigatório' })
    .trim()
    .min(3, 'O link encurtado deve ter no mínimo 3 caracteres')
    .max(50, 'O link encurtado deve ter no máximo 50 caracteres')
    .regex(
      shortenedLinkRegex,
      'O link encurtado deve conter apenas letras, números, hífens (-) e underscores (_)'
    )
});