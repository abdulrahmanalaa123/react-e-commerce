import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";
import ProductsLayout from "../layouts/ProductsLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="products/:category?" element={<ProductsLayout />}></Route>
    </Route>
  )
);

export default router;
