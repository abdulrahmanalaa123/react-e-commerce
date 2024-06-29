import ReactModal from "react-modal";
import "./modals.css";
import { useMediaPredicate } from "react-media-hook";
import Logo from "../../assets/svgs/logo.svg";
import SvgClose from "../../assets/svgs/Close";
import NavLinks from "../navbar/NavLinks";

ReactModal.setAppElement("body");
export default function NavModal({ isOpen, toggleOpen }) {
  const biggerThan700 = useMediaPredicate("(min-width: 768px)");

  return (
    <ReactModal
      isOpen={biggerThan700 ? false : isOpen}
      onAfterOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onRequestClose={() => {
        toggleOpen();
      }}
      onAfterClose={() => {
        document.body.style.overflow = "unset";
      }}
      overlayClassName="md:hidden fixed backdrop-blur-[3px] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 "
      className={`md:hidden absolute mr-auto left-0 right-0 top-0 bottom-0 bg-backgrounds-modalBg border-2 broder-[#DCDCE4] px-4 py-4 w-[18.75rem] max-w-[70%]  h-screen opacity-0 ${
        isOpen ? "navAppearAnimation" : "navDisappearAnimation"
      }`}
      closeTimeoutMS={200}
    >
      <>
        <button
          className="absolute top-2 right-2 self-center text-[0.75rem] flex items-center py-1 px-1 rounded-md"
          onClick={(e) => {
            toggleOpen();
            e.stopPropagation();
          }}
        >
          <SvgClose className="w-6 h-6 stroke-2"></SvgClose>
        </button>
        <img src={Logo} alt="" className="flex-shrink-0" />
        <div className="flex flex-col gap-4 p-4">
          <NavLinks size={"large"} />
        </div>
      </>
    </ReactModal>
  );
}
