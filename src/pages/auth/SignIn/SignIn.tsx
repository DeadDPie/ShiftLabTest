import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ResendCodeText } from "@pages/auth/SignIn/ResendCodeText.tsx";

import {
  SignInSchemaType,
  signInSchemaWithOtp,
  signInSchemaWithoutOtp,
} from "@shared/types/types.ts";
import { Button } from "@shared/ui/Button/Button.tsx";
import { Input } from "@shared/ui/Input/Input.tsx";
import { Typography } from "@shared/ui/Typography/Typography.tsx";

export const SignIn = () => {
  const [otp, setOtp] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    mode: "onChange",
    resolver: zodResolver(otp ? signInSchemaWithOtp : signInSchemaWithoutOtp),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = (data) => {
    console.log(data, otp);
    if (!otp) {
      setOtp(true);
    } else {
      console.log("Вы вошли в аккаунт");
    }
  };
  return (
    <div className="flex flex-col items-start mt-24 ml-60 gap-6">
      <Typography variant="t">Вход</Typography>
      <Typography variant="p16">
        Введите {otp ? "проверочный код" : "номер телефона"} для входа <br />в
        личный кабинет
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
        {otp && (
          <Input
            name="code"
            register={register}
            errors={errors.code}
            placeholder="Проверочный код"
            isRequired={otp}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
        )}

        <Button type="submit" variant={"FILL"} className={"max-w-[328px]"}>
          {otp ? "Войти" : "Продолжить"}
        </Button>
      </form>

      {otp && <ResendCodeText />}
    </div>
  );
};
