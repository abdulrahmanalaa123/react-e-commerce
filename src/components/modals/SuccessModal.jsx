import { useState } from "react";
import Success from "../../assets/svgs/success.svg";
import ReactModal from "react-modal";
import "./modals.css";

export default function SuccessModal({ open, clearSearchParams }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      onRequestClose={() => {
        setIsOpen(false);
        setTimeout(() => {
          clearSearchParams();
        }, 200);
      }}
      overlayClassName="fixed backdrop-blur-[3px] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 appearAnimation"
      className={`rounded-md absolute m-auto left-0 right-0 top-0 bottom-0 bg-backgrounds-modalBg px-6 py-4 flex flex-col max-w-[430px] min-h-[400px] max-h-max w-full justify-items-center items-center opacity-0 shadow-[3px_1px_18px_#0003] ${
        isOpen ? "appearAnimation" : "disappearAnimation"
      }`}
      closeTimeoutMS={200}
    >
      <>
        <div className="p-4 w-full h-full relative">
          <img
            src={Success}
            alt="success-image"
            className="w-full h-full object-contain "
          />
        </div>
        <p className="text-primary-300 font-bold text-lg mt-auto">
          Wait comfortably while your products are being packed
        </p>
      </>
    </ReactModal>
  );
}
