import React, { useRef, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import InputChip from "./InputChip";
import { createContent } from "../api";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  open,
  onClose,
}) => {
  const titleRef = useRef<HTMLFormElement>();
  const typeRef = useRef<HTMLFormElement>();
  const linkRef = useRef<HTMLFormElement>();
  const descriptionRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chips, setChips] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = titleRef.current?.value;
    const type = typeRef.current?.value;
    const link = linkRef.current?.value;
    const description = descriptionRef.current?.value;
    //bugs
    try {
      setLoading(true);

      const response = await createContent(
        title,
        type,
        chips,
        description,
        link
      );

      setLoading(false);
      if (response.statusText === "OK") {
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form className="space-y-3 mt-7" onSubmit={handleSubmit}>
        <p className="font-medium">Add Content</p>
        <Input type="text" placeholder="Title" reference={titleRef} />
        <select
          name=""
          id=""
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md h-10 p-2
           focus:ring-blue-500 focus:border-blue-500 block w-full mb-2"
          ref={typeRef as unknown as React.LegacyRef<HTMLSelectElement>}
        >
          <option selected>Select the Type</option>
          <option value="tweet">Tweet</option>
          <option value="youtube">Youtube</option>
        </select>
        <Input type="text" placeholder="Link" reference={linkRef} />
        <InputChip chips={chips} setChips={setChips} />
        <textarea
          placeholder="Description (optional)"
          rows={3}
          ref={
            descriptionRef as unknown as React.LegacyRef<HTMLTextAreaElement>
          }
          className="w-full border border-gray-300 text-sm
          rounded-md focus:ring-blue-500 p-2 focus:border-blue-500"
        ></textarea>
        <div className="flex">
          <Button
            className="w-full flex justify-center mt-3"
            variant="primary"
            text="Add"
            loading={loading}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateContentModal;
