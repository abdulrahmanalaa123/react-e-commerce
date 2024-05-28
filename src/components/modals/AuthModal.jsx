import ReactModal from "react-modal";
import "./modals.css";
import transparentLogo from "../../assets/svgs/transparentLogo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("body");
export default function AuthModal({ open, children }) {
  const [isOpen, setIsOpen] = useState(open);
  const navigate = useNavigate();

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={() => {
        setIsOpen(false);
        setTimeout(() => {
          navigate(-1);
        }, 200);
      }}
      overlayClassName="fixed backdrop-blur-[3px] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 appearAnimation"
      className={`absolute m-auto left-0 right-0 top-0 bottom-0 bg-backgrounds-modalBg px-6 py-4 flex flex-col max-w-[430px] min-h-[570px] max-h-max w-full justify-items-center items-center opacity-0 shadow-[3px_1px_18px_#0003] ${
        isOpen ? "appearAnimation" : "disappearAnimation"
      }`}
      closeTimeoutMS={200}
    >
      <img src={transparentLogo} alt="" />
      {children}
    </ReactModal>
  );
}
