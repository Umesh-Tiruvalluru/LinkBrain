import React from "react";
import { twMerge } from "tailwind-merge";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        "w-full h-full max-w-screen-xl mx-auto px-2.5 sm:px-8 md:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
