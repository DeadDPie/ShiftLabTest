import { z } from "zod";

export const signInSchema = z.object({
  phone: z.string().min(1, { message: "Поле является обязательным" }),
  code: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 6, {
      message: "Код должен содержать 6 цифр",
    }),
  hasOtp: z.boolean(),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
