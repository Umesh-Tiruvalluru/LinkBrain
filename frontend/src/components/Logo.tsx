import { Brain } from "lucide-react";
import React from "react";
// import Brain from "/Brains.png";
const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 font-bold tracking-wider">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-900 p-2 rounded-lg">
        <Brain size={26} strokeWidth={2.5} className="text-white" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-800 text-transparent bg-clip-text">
        LinkBrain
      </span>
    </div>
  );
};

export default Logo;
