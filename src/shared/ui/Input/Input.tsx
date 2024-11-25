import classNames from "classnames";
import React, { FC, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  placeholder: string;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

export const Input: FC<InputProps> = ({
  name,
  register,
  errors,
  placeholder,
  onInput,
  isRequired,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        {...register(name, { required: isRequired })}
        onInput={onInput}
        className={classNames(
          "flex items-start p-3 gap-2 w-full border rounded-lg bg-white box-border mt-1 mb-1 bg-gray-100 transition-all duration-200 ease-out",
          {
            "border-red-500": errors,
            "border-gray": !errors,
          },
        )}
      />
      {errors && <p className="text-red-500 mt-1">{errors.message}</p>}
    </>
  );
};
