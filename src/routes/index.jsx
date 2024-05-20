import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";
import ProductsLayout, { productsLoader } from "../layouts/ProductsLayout";
import ProductPageLayout, {
  productPageLoader,
} from "../layouts/ProductPageLayout";
import ProductDoesntExist from "../pages/home/productPage/ProductDoesntExists";
import queryClient from "../lib/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route
        path="products/:category?"
        element={<ProductsLayout />}
        loader={productsLoader}
        errorElement={<ProductDoesntExist />}
      ></Route>
      <Route
        path="product/:productId"
        element={<ProductPageLayout />}
        loader={productPageLoader(queryClient)}
        errorElement={<ProductDoesntExist />}
      ></Route>
    </Route>
  )
);

export default router;
