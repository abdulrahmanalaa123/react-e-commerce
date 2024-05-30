import useCartStore from "../../stores/cart";
import { cartItemDetailsQuery } from "../../api/cart/getCartProduct";

const cartLoader = (queryClient) => async () => {
  const cartItems = useCartStore.getState().cartItems;
  const promises = cartItems.map((item) =>
    queryClient.ensureQueryData(cartItemDetailsQuery(item))
  );
  await Promise.all(promises);
  return null;
};

export default cartLoader;
