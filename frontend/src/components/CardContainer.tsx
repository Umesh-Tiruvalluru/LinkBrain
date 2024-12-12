import React from "react";
import Card from "../ui/Card";
import { CardData } from "../types";

interface CardContainerProps {
  data: CardData[];
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8">No data available.</div>;
  }

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((card) => (
        <div key={card._id} className="">
          <Card data={card} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
