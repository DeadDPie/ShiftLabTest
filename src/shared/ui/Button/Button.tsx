import classNames from "classnames";
import React from "react";

type ButtonVariant = "FILL" | "OUTLINE";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  type?: ButtonType;
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "FILL",
  type = "button",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        "text-base font-semibold rounded-2xl py-4 px-8 w-full",
        {
          "bg-primary text-white hover:bg-primaryDark": variant === "FILL",
          "bg-white border-white text-primary hover:bg-primaryLight ":
            variant === "OUTLINE",
          "border-primaryLight text-primaryLight cursor-not-allowed  hover:bg-white":
            disabled,
        },

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
