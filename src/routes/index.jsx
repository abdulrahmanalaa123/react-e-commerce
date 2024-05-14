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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="products/:category?" element={<ProductsLayout />}></Route>
      <Route path="product/:productId" element={<ProductPageLayout />}></Route>
    </Route>
  )
);

export default router;
