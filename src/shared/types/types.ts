import { z } from "zod";

export const signInSchemaWithoutOtp = z.object({
  phone: z.string().min(1, { message: "Поле является обязательным" }),
});

export const signInSchemaWithOtp = z.object({
  phone: z.string().min(1, { message: "Поле является обязательным" }),
  code: z
    .string()
    .min(6, { message: "Код должен содержать 6 цифр" })
    .max(6, { message: "Код должен содержать 6 цифр" }),
});

export type SignInSchemaType = {
  phone: string;
  code?: string;
};
