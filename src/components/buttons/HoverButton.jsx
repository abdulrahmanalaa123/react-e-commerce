import GoArrow from "../../assets/svgs/goToPage.svg";

function HoverButton({ onClick = () => {} }) {
  return (
    // changed into a button cuz it makes better sense as well as screanReaders
    <button
      className="group absolute top-0 left-0 hover:bg-[#00000026] focus-visible:bg-[#00000026] w-full h-full cursor-pointer"
      type="navigator"
      onClick={() => {
        console.log("div clicked");
      }}
    >
      <img
        src={GoArrow}
        className="hidden group-focus-visible:block group-hover:block absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto "
      />
    </button>
  );
}

export default HoverButton;
