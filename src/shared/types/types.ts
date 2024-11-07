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
  code?: string | undefined;
};

export interface UserData {
  name: string;
  email: string;
}

export interface FetchUserResponse {
  success: boolean;
  data?: UserData;
  message?: string;
}

export type VerifyOtpResponse = {
  success: true;
  token: string;
};
