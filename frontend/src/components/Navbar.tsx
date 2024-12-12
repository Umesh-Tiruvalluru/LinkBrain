import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Cross,
  LogOut,
  Menu,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [translate, setTranslate] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/login");
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 768 && setTranslate(false);
    });
  });

  return (
    <nav
      className="sticky h-20 inset-x-0 top-0 w-full border-b
     border-neutral-300 backdrop-blur-lg transition-all"
    >
      <MaxWidthWrapper>
        <div className="flex z-50 h-20 items-center justify-between ">
          <Logo />
          <div className="md:flex hidden items-center gap-4">
            <div className="relative mr-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="h-8 w-px bg-zinc-300 hidden sm:block" />

            <Button
              startIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
              className="text-sm"
              variant="secondary"
              text="Filters"
            />

            <Button
              startIcon={<LogOut className="h-3.5 w-3.5" />}
              className="text-sm"
              variant="primary"
              text="Log out"
              onClick={handleLogout}
            />
          </div>
          <button
            className="block md:hidden"
            onClick={() => setTranslate(!translate)}
          >
            {translate ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </MaxWidthWrapper>
      <div
        className={`${
          translate ? "translate-y-0 opacity-100" : "-translate-y-52 opacity-0"
        } py-6 absolute bg-white  -z-20  transition-all duration-500 w-full `}
      >
        <MaxWidthWrapper className="flex flex-wrap gap-4 items-center">
          <div className="flex-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              startIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
              className="text-sm"
              variant="secondary"
              text="Filters"
            />

            <Button
              startIcon={<LogOut className="h-3.5 w-3.5" />}
              className="text-sm"
              variant="primary"
              text="Log out"
              onClick={handleLogout}
            />
          </div>
        </MaxWidthWrapper>
      </div>
    </nav>
  );
};

export default Navbar;
