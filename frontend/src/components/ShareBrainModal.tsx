import { Copy } from "lucide-react";
import { isLinkExist, share } from "../api";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import React from "react";
import toast from "react-hot-toast";

interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareBrainModal: React.FC<ShareBrainModalProps> = ({ open, onClose }) => {
  const [hash, setHash] = React.useState<string>("");

  async function fetchHash() {
    const response = await isLinkExist();
    setHash(response);
  }

  React.useEffect(() => {
    fetchHash();
  }, [hash]);

  async function handleClick(s: boolean) {
    const response = await share(s);
    setHash(response);
  }

  function copy() {
    window.navigator.clipboard.writeText(
      `http://linkbrain-frontend.onrender.com/brain/${hash}`,
    );
    toast.success("Copy to the Clipboard");
  }

  return (
    <Modal open={open} onClose={onClose}>
      {hash ? (
        <div>
          <h1 className="text-2xl font-bold ">Copy the link below</h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <input
              className="flex h-10 w-full rounded-md placeholder:font-medium placeholder:tracking-wider border border-neutral-300 px-3 py-2 text-base ring-offset-backgroud focus-visible:outline-none focus-visible:ring-2 text-gray-700 focus-visible:ring-ring
               focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              type="text"
              value={`https://linkbrain-frontend.onrender.com/brain/${hash}`}
              readOnly
            />
            <button onClick={copy} className="p-2 bg-white rounded-lg">
              <Copy size={18} />
            </button>
          </div>
          <Button
            className="mt-4 flex w-full items-center justify-center"
            variant="primary"
            text="Stop Sharing"
            onClick={() => handleClick(false)}
          />
        </div>
      ) : (
        <div className="my-4">
          <h1 className="text-2xl font-bold">Share Your Brain🧠✨</h1>
          <p className="font-medium text-gray-600">
            Inspire others by sharing your resources and ideas
          </p>
          <Button
            className="mt-4"
            variant="primary"
            text="Genrate Link"
            onClick={() => handleClick(true)}
          />
        </div>
      )}
    </Modal>
  );
};

export default ShareBrainModal;
