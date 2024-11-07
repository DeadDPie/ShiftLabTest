import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { ResendCodeText } from "@pages/auth/SignIn/ResendCodeText.tsx";

import { useAuth } from "@shared/hooks/useAuth.tsx";
import {
  SignInSchemaType,
  signInSchemaWithOtp,
  signInSchemaWithoutOtp,
} from "@shared/types/types.ts";
import { Button } from "@shared/ui/Button/Button.tsx";
import { Input } from "@shared/ui/Input/Input.tsx";
import { Typography } from "@shared/ui/Typography/Typography.tsx";

export const SignIn = () => {
  const authLogic = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    mode: "onChange",
    resolver: zodResolver(
      authLogic.otp ? signInSchemaWithOtp : signInSchemaWithoutOtp,
    ),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    if (!authLogic.otp) {
      authLogic.handleOtpRequest(data.phone);
    } else {
      authLogic.handleOtpVerification(data);
    }
  };

  return (
    <div className="flex flex-col items-start mt-24 ml-60 gap-6">
      <Typography variant="t">Вход</Typography>
      <Typography variant="p16">
        Введите {authLogic.otp ? "проверочный код" : "номер телефона"} для входа{" "}
        <br />в личный кабинет
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-[464px]"
      >
        <Input
          name="phone"
          register={register}
          errors={errors.phone}
          placeholder="Телефон"
          isRequired={true}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
        />
        {authLogic.otp && (
          <Input
            name="code"
            register={register}
            errors={errors.code}
            placeholder="Проверочный код"
            isRequired={authLogic.otp}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
        )}

        <Button type="submit" variant={"FILL"} className={"max-w-[328px]"}>
          {authLogic.otp ? "Войти" : "Продолжить"}
        </Button>
      </form>

      {authLogic.otp && <ResendCodeText />}
    </div>
  );
};
