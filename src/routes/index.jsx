import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";
import ProductsLayout from "../layouts/ProductsLayout";
import ProductPageLayout from "../layouts/ProductPageLayout";
import ProductDoesntExist from "../pages/home/productPage/ProductDoesntExists";
import { formatHelper } from "../utils/formatHelper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route
        path="products/:category?"
        element={<ProductsLayout />}
        loader={({ params }) => {
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
        }}
        errorElement={<ProductDoesntExist />}
      ></Route>
      <Route
        path="product/:productId"
        element={<ProductPageLayout />}
        errorElement={<ProductDoesntExist />}
      ></Route>
    </Route>
  )
);

export default router;
