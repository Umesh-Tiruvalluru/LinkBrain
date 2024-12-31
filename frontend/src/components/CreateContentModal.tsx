import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createContent } from "../api";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import InputChip from "./InputChip";
import toast from "react-hot-toast";
import { DataProps } from "../types";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  open,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm<DataProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: createContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("successfully created a content");
      reset();
    },
  });
  const [chips, setChips] = useState<string[]>([]);

  const onSubmit = (data: DataProps) => {
    console.log({ ...data, chips });
    mutate({ ...data, chips: chips });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="font-semibold">Add Content</p>
        <input
          className="flex h-10 w-full rounded-md placeholder:font-medium placeholder:tracking-wider border border-neutral-300 px-3 py-2 text-base ring-offset-backgroud focus-visible:outline-none focus-visible:ring-2 text-gray-700 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="text"
          {...register("title", { required: "The title field is required" })}
          placeholder="Title"
        />

        <select
          className="bg-gray-50 border border-neutral-300 text-gray-700 text-sm rounded-md h-10 p-2
           focus:ring-blue-500 focus:border-blue-500 block w-full mb-2"
          id="type"
          {...register("type", { required: "Please select this filed" })}
        >
          <option value="tweet" className="font-bold">
            Tweet
          </option>
          <option value="youtube">Youtube</option>
        </select>

        <input
          className="flex h-10 w-full rounded-md placeholder:font-medium placeholder:tracking-wider border border-neutral-300 px-3 py-2 text-base ring-offset-backgroud focus-visible:outline-none focus-visible:ring-2 text-gray-700 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="text"
          {...register("link", { required: "This Link field is required" })}
          placeholder="Link"
        />
        <InputChip chips={chips} setChips={setChips} />
        <textarea
          placeholder="Description"
          rows={3}
          {...register("description", { required: "This field is required" })}
          className="w-full border placeholder:font-medium
                  rounded-md placeholder:tracking-wider border-neutral-300 px-3 py-2 text-base ring-offset-backgroud focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        ></textarea>
        <div>
          <Button
            className="w-full flex justify-center mt-3"
            variant="primary"
            text="Add"
            loading={isPending}
          />
        </div>
      </form>
    </Modal>
  );
};
export default CreateContentModal;
