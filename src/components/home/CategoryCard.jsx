import ReusableButton from "../buttons/ReusableButton";

function CategoryCard({ img, category }) {
  return (
    <>
      <div className="text-center my-6">
        <img src={img} alt="" className="mx-auto w-[150px] aspect-[3/4] mt-3" />
        <p className="text-lg my-2">{category}</p>
      </div>
      <div className="my-8">
        <ReusableButton
          text={"EXPLORE MORE"}
          onClick={() => {}}
        ></ReusableButton>
      </div>
    </>
  );
}

export default CategoryCard;
