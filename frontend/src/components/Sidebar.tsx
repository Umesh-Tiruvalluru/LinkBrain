import React from "react";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { LogOut, Twitter, Youtube } from "lucide-react";

const Sidebar: React.FC = ({}) => {
  return (
    <div className="h-dvh p-3 bg-white border-r fixed left-0 top-0 min-w-[20%]">
      <div className="mt-3">
        <Logo />
      </div>
      <div className="my-10 space-y-80 flex flex-col justify-between">
        <div className="">
          <div className="p-4 hover:bg-purple-700/50 rounded-lg cursor-pointer max-w-56">
            <SidebarItem icon={<Twitter size={20} />} label="Twitter" />
          </div>
          <div className="p-4 hover:bg-purple-700/50 rounded-lg cursor-pointer max-w-56">
            <SidebarItem icon={<Youtube size={20} />} label="Youtube" />
          </div>
          <div className="p-4 hover:bg-purple-700/50 rounded-lg cursor-pointer max-w-56">
            <SidebarItem icon={<>#</>} label="Tags" />
          </div>
        </div>
        <div className="flex gap-4 items-center font-bold p-4 rounded-lg cursor-pointer">
          <LogOut />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
