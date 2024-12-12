import React, { useRef } from "react";
import Chip from "../ui/Chip";

interface InputChipProps {
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputChip: React.FC<InputChipProps> = ({ chips, setChips }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDelete(chipToDelete: string) {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newChip = inputRef.current?.value.trim();
      if (newChip) {
        setChips([...chips, newChip]);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    } else if (e.key === "Backspace" && !inputRef.current?.value) {
      const lastChip = chips[chips.length - 1];
      handleDelete(lastChip);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2 border border-gray-300 text-sm
          rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
      style={{ maxWidth: "100%" }}
    >
      {chips.map((chip: string, index: number) => (
        <Chip key={index} onDelete={() => handleDelete(chip)} label={chip} />
      ))}
      <input
        className="outline-none flex-grow min-w-[100px]"
        type="text"
        ref={inputRef}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press Enter to Add Tag"
      />
    </div>
  );
};

export default InputChip;
