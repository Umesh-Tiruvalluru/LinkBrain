import { Brain } from "lucide-react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import CardContainer from "../components/CardContainer";
import { getShareData } from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Share() {
  const { shareId } = useParams<string>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getData() {
      if (!shareId) return;
      try {
        const res = await getShareData(shareId);
        console.log(res?.data);
        setData(res?.data);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [shareId]);

  return (
    <div className="bg-gray-50 min-h-dvh flex flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center gap-4 w-full h-80 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-900 text-center">
        <div className="absolute inset-0 opacity-40 bg-pattern"></div>
        <Brain
          size={56}
          className="text-white hover:scale-110 transform transition duration-300"
        />
        <h1 className="text-4xl font-extrabold text-white">LinkBrain</h1>
        <h2 className="text-xl font-medium text-indigo-200 tracking-wide">
          🌟 Transform Ideas into Insights! 🌟
        </h2>
        {/* Call-to-Action */}
        <button className="mt-4 px-6 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition duration-300">
          Build Your Brain Now
        </button>
      </div>

      {/* Content Section */}
      <MaxWidthWrapper>
        <div className="mt-8">
          {data.content ? (
            <CardContainer data={data.content} />
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-600 font-medium">
                No content to display. Start building your second brain today!
              </p>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Share;
