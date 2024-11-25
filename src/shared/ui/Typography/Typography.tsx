import classNames from "classnames";
import React from "react";

type TypographyType = "t" | "p16" | "p14";
type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyType;
  tag?: TypographyTag;
  children: React.ReactNode;
}

const variantClasses: Record<TypographyType, string> = {
  t: "font-bold text-2xl",
  p16: "font-normal text-base",
  p14: "font-normal text-sm",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "p16",
  tag: Tag = "p",
  children,
  className,
  ...props
}) => {
  return (
    <Tag className={classNames(variantClasses[variant], className)} {...props}>
      {children}
    </Tag>
  );
};
