import { useEffect, useState } from "react";

import { Button } from "@shared/ui/Button/Button.tsx";
import { Typography } from "@shared/ui/Typography/Typography.tsx";

export const ResendCodeText = () => {
  const [seconds, setSeconds] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isButtonDisabled && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isButtonDisabled, seconds]);

  const handleResendCode = () => {
    setSeconds(30);
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 30000);
  };

  return (
    <div>
      <Button
        type="button"
        variant={"OUTLINE"}
        className={"text-secondGray max-w-[328px]"}
        onClick={handleResendCode}
        disabled={isButtonDisabled}
      >
        Запросить код ещё раз
      </Button>
      {isButtonDisabled && (
        <Typography variant="p14" className={"text-gray"}>
          Запросить код повторно можно через {isButtonDisabled ? seconds : 0}{" "}
          секунд
        </Typography>
      )}
    </div>
  );
};
