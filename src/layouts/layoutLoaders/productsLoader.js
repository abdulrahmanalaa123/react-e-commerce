import { formatHelper } from "../../utils/formatHelper";

export default function productsLoader({ params }) {
  if (
    params.category !== undefined &&
    !formatHelper["category"](params.category)
  ) {
    // can be replaced by throwing an error and making a fallback component which reroutes to the home screen or the products page
    // which is better for UX and not error prone like this method
    console.log("boys we're going on a ride");
    throw "Sorry this page doesnt exist";
    // throw "Sorry this Page Doesnt exist";
  }
  return null;
}
