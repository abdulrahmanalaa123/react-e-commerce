import { useState } from "react";
import filterSVG from "../../../assets/svgs/filter.svg";
import FilterModal from "../../modals/FilterModal";

function MobileFilterButton() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  function toggleOpen() {
    setIsFilterModalOpen(!isFilterModalOpen);
  }
  return (
    <>
      <button
        className="md:hidden  p-2 flex-shrink-0"
        onClick={() => {
          toggleOpen();
        }}
      >
        <img src={filterSVG} alt="open-filter-menu" />
      </button>
      <FilterModal
        isOpen={isFilterModalOpen}
        toggleOpen={toggleOpen}
      ></FilterModal>
    </>
  );
}

export default MobileFilterButton;
