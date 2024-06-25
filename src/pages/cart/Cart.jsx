import useCartStore from "../../stores/cart";
import { getCartItemDetails } from "../../api/cart/getCartProduct";
import CartTable from "../../components/cart/CartTable";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/productsView/dataStateComponents/ErrorComponent";
import LoadingComponent from "../../components/productsView/dataStateComponents/LoadingComponent";
import createPaymentIntent from "../../api/checkout/createPaymentIntent";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { data, loading, pending, error, refetch } =
    getCartItemDetails(cartItems);

  return (
    <section id="cart-page" className="w-full h-full">
      <p className="mx-auto mt-6 font-medium text-xl w-min">Cart</p>
      <p className="ml-2 text-md mb-4">Your Items ({cartItems.length})</p>

      <section id="cart-view" className="grid grid-cols-3 gap-6 h-full">
        <section
          id="cart-table"
          //  md:max-h-screen md:overflow-y-scroll
          className="col-span-3 md:col-span-2 md:mb-20 "
        >
          <div className="flex flex-col gap-4">
            {loading || pending ? (
              <LoadingComponent />
            ) : error ? (
              <ErrorComponent refetchFunction={refetch} />
            ) : data.length > 0 ? (
              <CartTable data={data}></CartTable>
            ) : (
              <div className="text-text-300 text-lg flex flex-col items-center justify-center gap-4">
                See Our Products So you could Add Something to the Cart
                <Link
                  to="/products"
                  className="py-2 px-6 border transition-colors duration-75 text-text-200 border-text-100 hover:text-text-300 hover:border-text-300 w-64 max-w-full text-center mx-auto self-end rounded-sm"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className="col-span-3 md:col-span-1 h-min bg-[#EAEAEA4D] px-2 py-4 md:mb-0 mb-20">
          <div className="flex flex-col gap-4 justify-start items-center w-full h-full">
            <p className="text-md font-semibold p-3">Order Summary</p>
            <button
              onClick={async () => {
                await createPaymentIntent(data);
              }}
              className="p-2 rounded-lg bg-black text-white"
            >
              Test button
            </button>
            <div className="flex flex-col gap-5 items-stretch w-full">
              <div className="flex justify-between pr-11 pl-3">
                <p>Subtotal</p>
                <p>
                  {`${data
                    .reduce((accum, item) => accum + item.qty * item.price, 0)
                    .toFixed(2)}$`}
                </p>
              </div>
              <div className="flex justify-between  pr-11 pl-3">
                <p>Shipping</p>
                <p className="mr-4">-</p>
              </div>
              <div className="flex justify-between pr-11 pl-3">
                <p>Total</p>
                <p>
                  {`${data
                    .reduce((accum, item) => accum + item.qty * item.price, 0)
                    .toFixed(2)}$`}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <p className="text-[0.75rem] text-center">
                Shipping fees are calculated upon adress selection
              </p>
              <Link
                to="/products"
                className="py-2 px-6 border transition-colors duration-75 text-text-200 border-text-100 hover:text-text-300 hover:border-text-300 w-64 max-w-full text-center mx-auto self-end rounded-sm"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className={`${
                  data.length === 0 ? "pointer-events-none bg-text-200" : ""
                } py-2 px-6 border transition-colors duration-75 bg-text-300 text-white hover:border-text-300 hover:text-text-300 hover:bg-white w-64 max-w-full text-center mx-auto self-end rounded-sm`}
                state={data}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Cart;
