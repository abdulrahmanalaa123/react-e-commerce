import useCartStore from "../../stores/cart";
import useUserStore from "../../stores/user";
import { bulkAddCartItems } from "./bulkAddCartItems";
import getCartItems from "./getCartItems";
import getCart from "./getCart";
import signOut from "../auth/signOut";
// need to add retries to this
const maxRetries = 3;
// exponential factor for the exponential backoff
const b = 2;
// multiplier delay factor in the exponential backoff
const delay = 100;

// this doesnt take in consideration adding cart where it had items
// this would be solved by wrapping each request in the try catch with exponential backoff
// which i will not do or realizing which had the error and retry it only which is the same
// which i will not do as well ill leave it at this till it come bites me back
async function syncCart(retries) {
  try {
    let cartId = useUserStore.getState().cartId;
    if (cartId === null) {
      cartId = await getCart();
      useUserStore.getState().setCartId(cartId);
    }
    const currentCart = useCartStore.getState().cartItems;
    if (currentCart.length) {
      await bulkAddCartItems({
        cartId: cartId,
        cartItems: currentCart,
      });
    }
    const cartItems = await getCartItems(cartId);
    useCartStore.getState().setCartItems(cartItems);
  } catch (e) {
    if (retries > 0) {
      const retry = Math.min(maxRetries - 1, retries - 1);
      setTimeout(() => {
        syncCart(retry);
      }, b ** (maxRetries - retry) * delay);
    } else {
      await signOut();
    }
  }
}

export default syncCart;
