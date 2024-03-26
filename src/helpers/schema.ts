import { z } from 'zod';

export const schema = z.object({
  name: z
    .string()
    .refine(value => /^\p{Lu}[\p{L}\s.'-]+$/u.test(value), {
      message: 'Назва посту має починатися з великої літери (без цифр)',
    })
    .refine(value => value.length <= 40, 'Максимальна довжина 40 символів')
    .refine(value => value.length > 0, "Назва посту є обов'язковим полем"),
  about: z
    .string()
    .refine(value => value.trim().length > 0, "Зміст посту є обов'язковим полем"),
  phone: z
    .string()
    .refine(value => /^\d{3}-\d{2}-\d{2}$/.test(value), {
      message: 'Номер має бути в форматі 555-55-55',
    })
    .refine(value => value.length > 0, "Номер є обов'язковим полем"),
});
