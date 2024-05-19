import { Link } from "react-router-dom";
import brokenPot from "../../../assets/images/brokenPot.png";
function ProductDoesntExist() {
  return (
    <div className="h-screen flex-col items-center  ">
      <div className="text-center flex-col w-fit mx-auto">
        <p className="text-error text-[3rem] md:text-[5rem] justify-self-start text-start">
          Sorry
        </p>
        <p className="text-lg md:text-3xl text-start text-wrap">
          we couldnt find that page you're looking for.
        </p>
        <p className="text-lg md:text-3xl text-wrap text-start">
          try searching or go to
          <Link
            to="/"
            className="ml-2 text-primary-300 md:text-[3rem] text-[2rem]"
          >
            Home.
          </Link>
        </p>
      </div>
      <img src={brokenPot} alt="" className="object-contain mx-auto" />
    </div>
  );
}

export default ProductDoesntExist;
