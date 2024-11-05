import { Button } from "@shared/ui/Button/Button.tsx";
import { Typography } from "@shared/ui/Typography/Typography.tsx";

export const SignIn = () => {
  const hasOtp = false;
  const seconds = 30;
  return (
    <div className="flex flex-col items-start mt-24 ml-60 gap-6">
      <Typography variant="t">Вход</Typography>
      <Typography variant="p16">
        Введите {hasOtp ? "проверочный код" : "номер телефона"} для входа <br />{" "}
        в личный кабинет
      </Typography>

      <Button variant={"FILL"}>{hasOtp ? "Войти" : "Продолжить"}</Button>
      <Typography variant="p14" className={"text-gray"}>
        Запросить код повторно можно через {seconds} секунд
      </Typography>
    </div>
  );
};
