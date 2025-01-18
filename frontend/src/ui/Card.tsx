import React from "react";
import { ExternalLink, Trash } from "lucide-react";
import Tag from "../components/Tag";
import { formatDate } from "../utilis";
import { CardData } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDelete } from "../api";
import toast from "react-hot-toast";
import { XEmbed, YouTubeEmbed } from "react-social-media-embed";

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
      <div className="mb-4 flex justify-center">
        {/* Youtube Embed */}
        {data.type === "youtube" && (
          <div className="w-full h-full">
            <YouTubeEmbed url={data.link} width="100%" height={150} />
          </div>
        )}

        {data.type === "tweet" && (
          <div className="">
            <XEmbed url={data.link.replace("x.com", "twitter.com")} />
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
