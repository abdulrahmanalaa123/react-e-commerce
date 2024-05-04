import GoArrow from "../../assets/svgs/goToPage.svg";

function HoverButton({ onClick = () => {} }) {
  return (
    <div
      className="group absolute top-0 left-0 hover:bg-[#00000026] w-full h-full cursor-pointer"
      onClick={() => {
        console.log("div clicked");
      }}
    >
      <img
        src={GoArrow}
        className="hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto "
      />
    </div>
  );
}

export default HoverButton;
