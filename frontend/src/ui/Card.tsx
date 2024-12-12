import React from "react";
import { ExternalLink, Trash } from "lucide-react";
import Tag from "../components/Tag";
import { formatDate } from "../utilis";
import axios from "axios";
import { CardData } from "../types";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/content/${data._id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
    } catch (e) {
      console.error("Error deleting content:", e);
    }
  };

  function correctedLink(link: string): string {
    if (link.includes("youtu.be")) {
      return link.replace("youtu.be/", "youtube.com/embed/");
    } else if (link.includes("youtube.com/watch")) {
      return link.replace("youtube.com/watch?v=", "youtube.com/embed/");
    }
    return link;
  }

  return (
    <div className="bg-white h-auto rounded-lg p-4 shadow-md border border-neutral-300 flex flex-col">
      <div className="mb-1">
        <div className="flex items-center justify-between">
          <h1 className="font-bold uppercase">{data.title}</h1>
          <div className="flex items-center gap-2">
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} strokeWidth={2.5} />
            </a>
            <button onClick={onDelete}>
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
          <blockquote className="twitter-tweet">
            <a href={data.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
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
