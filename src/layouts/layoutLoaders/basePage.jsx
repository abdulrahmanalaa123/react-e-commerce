import me from "../../api/auth/me";
import getCart from "../../api/cart/getCart";
import useCartStore from "../../stores/cart";
import useUserStore from "../../stores/user";

const baseLayoutLoader = async () => {
  try {
    const userSession = await me();
    if (userSession === null) {
      throw "User not found";
    }

    const cartId = await getCart();
    // useUserStore
    //   .getState()
    //   .setUserData({ metaData: userSession.user.user_metadata });
    useUserStore.getState().setCartId(cartId);
    const cartItems = await getCartItems(cartId);
    useCartStore.getState().setCartItems(cartItems);
    console.log(useCartStore.getState().cartItems);
  } catch (e) {
    useUserStore.getState().deleteUserData();
  }
  return null;
};
export default baseLayoutLoader;
