import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reference?: any;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  onChange,
  value,
  reference,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={reference}
        className="flex h-10 w-full rounded-md placeholder:font-medium placeholder:tracking-wider border border-neutral-300 px-3 py-2 text-base ring-offset-backgroud focus-visible:outline-none focus-visible:ring-2 text-gray-700 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      />
      {/* {type === "password" && } */}
    </div>
  );
};

export default Input;
