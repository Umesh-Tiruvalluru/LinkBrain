import React from "react";

interface SidebarItemProps {
  icon: React.ReactElement;
  label: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
