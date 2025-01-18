import React from "react";
import { ExternalLink, Trash } from "lucide-react";
import Tag from "../components/Tag";
import { formatDate } from "../utilis";
import { CardData } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDelete } from "../api";
import toast from "react-hot-toast";
import { Tweet } from "react-tweet";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => onDelete(data._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Successfully Deleted");
    },
  });

  function correctedLink(link: string): string {
    if (link.includes("youtu.be")) {
      return link.replace("youtu.be/", "youtube.com/embed/");
    } else if (link.includes("youtube.com/watch")) {
      return link.replace("youtube.com/watch?v=", "youtube.com/embed/");
    }
    return link;
  }

  const getTweetId = (url: string): string => {
    // Handle both twitter.com and x.com URLs
    const regex = /(?:twitter|x)\.com\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <div className="bg-white w-full sm:max-w-[300px] rounded-lg p-4 shadow-md border border-neutral-300 flex flex-col">
      <div className="mb-1">
        <div className="flex items-center justify-between">
          <h1 className="font-bold uppercase">{data.title}</h1>
          <div className="flex items-center gap-2">
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} strokeWidth={2.5} />
            </a>
            <button onClick={() => mutate()}>
              <Trash size={16} strokeWidth={2.5} className="text-red-600" />
            </button>
          </div>
        </div>
        <time className="text-xs font-normal text-gray-500 tracking-wider">
          {formatDate(new Date(data.timestamp))}
        </time>
      </div>
      <p className="text-gray-500 mb-4 flex-grow">{data.description}</p>
      <div className="mb-4 overflow-hidden">
        {data.type === "youtube" && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded"
              src={correctedLink(data.link)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {data.type === "tweet" && (
          <div className="light test">
            <Tweet id={getTweetId(data.link)} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag, idx) => (
          <Tag key={idx} label={tag.tag} />
        ))}
      </div>
    </div>
  );
};

export default Card;
