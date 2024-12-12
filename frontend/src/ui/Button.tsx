import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

interface ButtonProps {
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  startIcon,
  text,
  onClick,
  loading,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `
        ${
          variant === "primary"
            ? "bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white font-semibold"
            : " hover:bg-purple-600/90 text-purple-800 hover:text-white font-bold transition-all duration-200"
        }
        px-4 py-2 flex items-center gap-2 rounded-lg border border-purple-950/20`,
        className
      )}
    >
      {startIcon}
      {loading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
