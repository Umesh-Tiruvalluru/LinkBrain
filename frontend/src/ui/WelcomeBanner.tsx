// import { Brain } from "lucide-react";
import banner from "/background.png";
import youtube from "/youtube.svg";
import linkedin from "/linkedin.svg";
import x from "/x.svg";

const WelcomeBanner = () => {
  return (
    <div className="h-full w-full flex flex-col rounded-xl justify-center items-center overflow-hidden bg-[linear-gradient(to_right_bottom,#4f39f6,#5a2ed9,#5e25be,#5d1da4,#59168b)] text-white relative">
      {/*<Brain className="" size={90} />

      <h2 className="text-3xl font-bold mt-8">Organize Your World</h2>
      <p className="text-lg mt-4 leading-relaxed">
        A powerful tool designed to help you store, organize, and revisit the
        resources that matter to you. Stay productive and focused.
      </p>*/}
      <div className="mx-auto relative">
        <img
          src={banner}
          alt="welcome-banner-image"
          className="w-96 h-[520px]"
        />
        <div className="w-40 h-24 bg-purple-400 border-2 py-4 px-3 border-[#223B88] absolute bottom-20 rounded-2xl left-2">
          <p className="font-montserrat text-[#223b88] font-bold">Save Links</p>
          <div className="w-26 rounded-2xl mt-2 h-3 border-[#223b88] border-2">
            <div className="h-full w-[80%] bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500"></div>
          </div>
        </div>
      </div>
      <p className="text-2xl font-semibold text-center max-w-[440px] font-montserrat">
        Make your work easier and organized with LinkBrain.
      </p>
      <div className="absolute right-10 space-y-4 h-48">
        <img src={youtube} className="w-12 h-12" />
        <div className="fill-white">
          <img src={x} className="w-12 h-9" />
        </div>
        <div className="bg-white rounded-xl">
          <img src={linkedin} className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
