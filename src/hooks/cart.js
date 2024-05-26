import useCartStore from "../stores/cart";
import useUserStore from "../stores/user";
import useAddItemToCart from "../api/cart/addCartItem";
import { useUpadteCartItem } from "../api/cart/updateCartItem";
import useRemoveItemFromCart from "../api/cart/deleteCartItem";
import {
  variantCartItemModel,
  inVariantCartItemModel,
} from "../objects/cartItemModel";

function formatter({ variantId, inVariantId, quantity }) {
  let cartItem;
  if (variantId) {
    cartItem = new variantCartItemModel({
      id: variantId,
      qty: quantity,
    });
  } else {
    cartItem = new inVariantCartItemModel({
      uuid: inVariantId,
      qty: quantity,
    });
  }
  return cartItem;
}

const useCart = () => {
  const cartId = useUserStore((state) => state.cartId);
  const addCartMutation = useAddItemToCart();
  const updateCartMutation = useUpadteCartItem();
  const deleteCartMutation = useRemoveItemFromCart();

  function addItemInterface({ variantId, inVariantId, quantity }) {
    const cartItem = formatter({ variantId, inVariantId, quantity });

    if (cartId) {
      addCartMutation.mutate({ cartId, cartItem });
    } else {
      useCartStore.getState().addCartItem({ cartItem });
    }
  }
  function updateItemInterface({ cartItem }) {
    const cartId = useUserStore.getState().cartId;

    if (cartId) {
      updateCartMutation.mutate({ cartId, cartItem });
    } else {
      useCartStore.getState().updateCartItem({ cartItem });
    }
  }
  function deleteItemInterface({ cartItem }) {
    const cartId = useUserStore.getState().cartId;

    if (cartId) {
      deleteCartMutation.mutate({ cartId, cartItem });
    } else {
      useCartStore.getState().deleteCartItem({ cartItem });
    }
  }
  return { updateItemInterface, addItemInterface, deleteItemInterface };
};

export default useCart;
