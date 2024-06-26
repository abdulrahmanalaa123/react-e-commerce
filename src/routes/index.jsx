import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home/Home";

import queryClient from "../lib/react-query";
import AuthWrapper from "../layouts/AuthWrapper";
import baseLayoutLoader from "../layouts/layoutLoaders/basePage";
import Cart from "../pages/cart/Cart";
import cartLoader from "../pages/cart/cartLoader";
import ProtectedWrapper from "../layouts/ProtectedWrapper";
import ProductDoesntExist from "../pages/ProductDoesntExists";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<BaseLayout />} loader={baseLayoutLoader}>
        <Route errorElement={<ProductDoesntExist />}>
          <Route index element={<Home />}></Route>
          <Route element={<AuthWrapper />}>
            <Route
              path="login"
              lazy={async () => {
                let signIn = await import(
                  "../components/auth/forms/SignInForm"
                );
                return { Component: signIn.default };
              }}
            ></Route>
            <Route
              path="register"
              lazy={async () => {
                let signUp = await import(
                  "../components/auth/forms/SignUpForm"
                );
                return { Component: signUp.default };
              }}
            ></Route>
          </Route>
          <Route
            path="products/:category?"
            lazy={async () => {
              // this is an async function the lazy importing was considered finsihed loading before page loading
              // was because it didnt wait for the lazy import to finish we couldve used deferring someway to enable that behaviour
              // using react lazy but using lazy importing with await makes no need of suspense although we could use itt adn it would be okay for standardizing the behavour
              // as well
              let ProductsLayout = await import(
                "../pages/products/ProductsPage"
              );
              let productsLoader = await import(
                "../layouts/layoutLoaders/products"
              );

              return {
                Component: ProductsLayout.default,
                loader: productsLoader.default,
              };
            }}
            errorElement={<ProductDoesntExist />}
          ></Route>
          <Route
            lazy={async () => {
              let ProductPageLayout = await import(
                "../pages/product/ProductPage"
              );
              let productPageLoader = await import(
                "../layouts/layoutLoaders/productPage"
              );

              return {
                Component: ProductPageLayout.default,
                loader: productPageLoader.default(queryClient),
              };
            }}
            path="product/:productId"
            errorElement={<ProductDoesntExist />}
          ></Route>
          <Route
            path="cart"
            element={<Cart />}
            loader={cartLoader(queryClient)}
          ></Route>
          <Route element={<ProtectedWrapper />}>
            <Route
              path="checkout"
              lazy={async () => {
                let CheckOut = await import("../pages/checkout/CheckOut");
                let checkoutLoader = await import(
                  "../pages/checkout/checkoutLoader"
                );

                return {
                  Component: CheckOut.default,
                  loader: checkoutLoader.default(queryClient),
                };
              }}
            ></Route>
          </Route>
          <Route path="*" element={<ProductDoesntExist />}></Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
