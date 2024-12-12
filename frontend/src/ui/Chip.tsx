import { X } from "lucide-react";
import React from "react";

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div
      className="inline-flex px-3 py-1 text-sm rounded-full items-center 
        bg-blue-100 text-blue-800 font-medium gap-2 mt-2 border border-blue-200"
    >
      <span className="capitalize">{label}</span>
      <button
        className="flex items-center justify-center w-4 h-4 rounded-full 
          bg-red-100 hover:bg-red-200 text-red-600"
        onClick={onDelete}
        aria-label="Remove chip"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default Chip;
