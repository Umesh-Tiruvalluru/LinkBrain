import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <div className="w-screen h-screen fixed inset-0 opacity-100 backdrop-blur-sm z-[100]  flex justify-center items-center">
          <div className="bg-neutral-100 p-8 w-80 rounded-lg relative border border-black">
            <button className="absolute top-3 right-3" onClick={onClose}>
              <X size={16} strokeWidth={3} className="text-neutral-700" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
