import { isLinkExist, share } from "../api";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import React from "react";

interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
}


const ShareBrainModal: React.FC<ShareBrainModalProps> = ({open, onClose}) => {
  const [hash, setHash] = React.useState<string | undefined>(undefined);


  async function fetchHash () {
    const response = await isLinkExist();
    setHash(response)

  }

  React.useEffect(()=>{
    fetchHash();
  }, [hash])


  async function handleClick   (s:boolean) {
    const response = await share(s);
    setHash(response);
  }

  return (
    <Modal open={open} onClose={onClose}>
      {
        hash ? (
          <div>
             <h1 className="text-2xl font-bold ">Copy the link below</h1>
             <input type="text" value={`http://localhost:5173/brain/${hash}`} readOnly />
             <Button 
              className="mt-4"
             variant="primary"
             text="Stop Sharing"
             onClick={() => handleClick(false)}
             />
          </div>
        ): (
          <div className="my-4">
              <h1 className="text-2xl font-bold">Share Your Brain🧠✨</h1>
              <p className="font-medium text-gray-600">Inspire others by sharing your resources and ideas</p>
              <Button
                className="mt-4"
                variant="primary"
                text="Genrate Link"
                onClick={() => handleClick(true)}
              />
          </div>
        )
      }
    </Modal>

  ); 
}

export default ShareBrainModal;
