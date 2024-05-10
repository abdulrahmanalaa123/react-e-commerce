import ReactModal from "react-modal";
import "./modals.css";
import FilteringComponent from "../productsView/mainComponents/FilteringComponent";

ReactModal.setAppElement("body");
export default function FilterModal({ isOpen, toggleOpen }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onRequestClose={() => {
        toggleOpen();
      }}
      onAfterClose={() => {
        document.body.style.overflow = "unset";
      }}
      overlayClassName="fixed backdrop-blur-[3px] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 md:hidden"
      className={`md:hidden absolute ml-auto left-0 right-0 top-0 bottom-0 bg-backgrounds-modalBg px-6 py-4 w-9/12 h-screen opacity-0 ${
        isOpen ? "filterAppearAnimation" : "filterDisappearAnimation"
      }`}
      closeTimeoutMS={200}
    >
      <FilteringComponent></FilteringComponent>
    </ReactModal>
  );
}
