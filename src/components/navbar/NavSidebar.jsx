import { useState } from "react";
import Menu from "../../assets/svgs/menu.svg";
import NavModal from "../modals/NavModal";

function NavSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <button className="block md:hidden flex-shrink-0" onClick={toggleOpen}>
        <img src={Menu} alt="" />
      </button>
      <NavModal isOpen={isOpen} toggleOpen={toggleOpen}></NavModal>
    </>
  );
}

export default NavSideBar;
