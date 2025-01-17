import { CirclePlus, Share2 } from "lucide-react";
import React from "react";
import { getData } from "../api.tsx";
import CardContainer from "../components/CardContainer";
import CreateContentModal from "../components/CreateContentModal.tsx";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import Button from "../ui/Button";
import ShareBrainModal from "../components/ShareBrainModal.js";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [shareBrainModal, setShareBrainModal] = React.useState<boolean>(false);

  const { data, isPending } = useQuery({
    queryKey: ["content"],
    queryFn: getData,
  });

  function onClose() {
    setModal(false);
  }

  function close() {
    setShareBrainModal(false);
  }

  return (
    <div className="bg-gray-200">
      <Navbar />
      {/* <Sidebar /> */}
      <MaxWidthWrapper className="pb-12">
        <div className="mt-11 space-y-8 min-h-screen">
          <CreateContentModal
            // setData={setData}
            open={modal}
            onClose={onClose}
          />
          <ShareBrainModal open={shareBrainModal} onClose={close} />
          <div className="flex flex-wrap  items-center justify-between gap-5 mt-0 sm:mt-3">
            <p className="text-2xl block font-bold">
              Welcome to your dashboard!
            </p>
            <div className="flex items-center w-full md:w-auto gap-4 mr-0.5">
              <Button
                className="text-sm flex items-center flex-auto justify-center"
                variant="secondary"
                startIcon={<Share2 size={18} strokeWidth={2.5} />}
                text="SHARE BRAIN"
                onClick={() => {
                  setShareBrainModal(true);
                }}
              />
              <Button
                className="text-sm flex items-center justify-center flex-auto"
                variant="primary"
                startIcon={<CirclePlus strokeWidth={2.6} size={18} />}
                text="ADD CONTENT"
                onClick={() => {
                  setModal(true);
                }}
              />
            </div>
          </div>
          <CardContainer data={data} isPending={isPending} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Dashboard;
