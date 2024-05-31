import { useQueries } from "@tanstack/react-query";
import useCartStore from "../../stores/cart";
import { cartItemDetailsQuery } from "../../api/cart/getCartProduct";
import CartTable from "./CartTable";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { data, loading, pending, error } = useQueries({
    queries: cartItems.map((item) => cartItemDetailsQuery(item)),
    combine: (results) => {
      return {
        // could use flat but to not fuck up the indeces it will remove empty arrays
        data: results.map((result) => result?.data[0] ?? {}),
        pending: results.some((result) => result.isPending),
        loading: results.some((result) => result.isLoading),
        error: results.find((results) => results.isError),
      };
    },
  });

  return (
    <section id="cart-view" className="w-full h-full">
      <p className="mx-auto mt-6 font-medium text-xl w-min">Cart</p>
      <p className="ml-2 text-md mb-4">Your Items ({cartItems.length})</p>

      <section className="grid grid-cols-3 gap-6 h-full">
        <section className="col-span-3 md:col-span-2 ">
          {!loading && (
            <CartTable
              data={[
                ...data.map((item, index) => ({
                  ...item,
                  ...cartItems[index],
                })),
              ]}
            ></CartTable>
          )}
        </section>
        <section className="col-span-3 md:col-span-1 h-full">
          <div className="bg-red-500 w-full h-full"></div>
        </section>
      </section>
    </section>
  );
}

export default Cart;
