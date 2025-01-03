import React from "react";
import Card from "../ui/Card";
import { CardData } from "../types";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";

interface CardContainerProps {
  data: CardData[];
  isPending: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({ data, isPending }) => {
  const [searchParams] = useSearchParams();

  if (isPending) {
    return <Loader />;
  }

  const filteredValue = searchParams.get("filter") || "all";
  let filteredData;

  if (filteredValue === "all") filteredData = data;
  if (filteredValue === "twitter")
    filteredData = data.filter((val: CardData) => val.type === "tweet");
  if (filteredValue === "youtube")
    filteredData = data.filter((val: CardData) => val.type === "youtube");

  if (!filteredData || filteredData.length === 0) {
    return <div className="text-center py-8">No data available.</div>;
  }

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredData.map((card) => (
        <div key={card._id} className="">
          <Card data={card} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
