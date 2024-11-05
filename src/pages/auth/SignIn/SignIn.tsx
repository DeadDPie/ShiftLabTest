import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { ResendCodeText } from "@pages/auth/SignIn/ResendCodeText.tsx";

import { SignInSchemaType, signInSchema } from "@shared/types/types.ts";
import { Button } from "@shared/ui/Button/Button.tsx";
import { Typography } from "@shared/ui/Typography/Typography.tsx";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
    defaultValues: { hasOtp: false },
  });
  const hasOtp = watch("hasOtp");

  const onSubmit: SubmitHandler<SignInSchemaType> = (data) => {
    console.log(data, hasOtp);
    if (!hasOtp) {
      setValue("hasOtp", true);
    } else {
      console.log("Вы вошли в аккаунт");
    }
  };
  console.log(hasOtp);
  return (
    <div className="flex flex-col items-start mt-24 ml-60 gap-6">
      <Typography variant="t">Вход</Typography>
      <Typography variant="p16">
        Введите {hasOtp ? "проверочный код" : "номер телефона"} для входа <br />
        в личный кабинет
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-[464px]"
      >
        <input
          placeholder="Телефон"
          {...register("phone", { required: true })}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
          className={`flex items-start p-3 gap-2  w-full 
             border rounded-lg 
             bg-white box-border 
             mt-1 mb-1
        ${errors.phone ? "border-red-500" : "border-gray"} 
        bg-gray-100 transition-all duration-200 ease-out`}
        />
        {errors.phone && (
          <p className="text-red-500 mt-1">{errors.phone.message}</p>
        )}

        {hasOtp && (
          <>
            <input
              placeholder="Проверочный код"
              {...register("code", { required: hasOtp })} //{ required: hasOtp }
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                );
              }}
              className={`flex items-start p-3 gap-2 w-full 
               border rounded-lg 
               bg-white box-border 
               mt-1 mb-1
          ${errors.code ? "border-red-500" : "border-gray"} 
          bg-gray-100 transition-all duration-200 ease-out`}
            />
            {errors.code && (
              <p className="text-red-500 mt-1">{errors.code.message}</p>
            )}
          </>
        )}

        <Button type="submit" variant={"FILL"} className={"max-w-[328px]"}>
          {hasOtp ? "Войти" : "Продолжить"}
        </Button>
      </form>

      {hasOtp && <ResendCodeText />}
    </div>
  );
};
