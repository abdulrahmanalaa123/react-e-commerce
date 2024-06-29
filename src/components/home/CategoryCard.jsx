import { Link } from "react-router-dom";
function CategoryCard({ img, category, subCategory }) {
  return (
    <>
      <div className="text-center my-6">
        <img src={img} alt="" className="mx-auto w-[150px] aspect-[3/4] mt-3" />
        <p className="text-lg my-2">{subCategory.toUpperCase()}</p>
      </div>
      <div className="my-8">
        <Link
          className="px-6 py-4 disabled:bg-text-200 bg-text-300 text-white hover:bg-primary-200 transition-colors duration-150 hover:text-text-300 w-64 max-w-full rounded-sm"
          to={`/products/${category}?subcategory=${subCategory}`}
        >
          EXPLORE MORE
        </Link>
      </div>
    </>
  );
}

export default CategoryCard;
