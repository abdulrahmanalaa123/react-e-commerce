import { cartItemDetailsQuery } from "../../api/cart/getCartProduct";
import confirmCreatePaymentIntent from "../../api/checkout/confirmCreatePaymentIntent";
import useCartStore from "../../stores/cart";

function checkoutLoader(queryClient) {
  return async () => {
    const cartItems = useCartStore.getState().cartItems;
    // promise.all results in parallelizing all the queries
    const cartQueries = await Promise.all(
      cartItems.map((item) =>
        queryClient.ensureQueryData(cartItemDetailsQuery(item))
      )
    );

    const combinedData = cartQueries.map((itemDetails, index) => ({
      ...itemDetails[0],
      ...cartItems[index],
    }));

    return combinedData;
  };
}

export default checkoutLoader;
