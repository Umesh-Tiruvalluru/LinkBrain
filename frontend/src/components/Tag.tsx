import React from "react";

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600/90 text-white text-black/90">
      {label}
    </p>
  );
};

export default Tag;
