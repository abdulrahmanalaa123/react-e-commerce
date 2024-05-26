import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";

async function addCartItem({ cartId, cartItem }) {
  let { data, error } = await supabase.rpc("upsert_cart_item", {
    cart_id: cartId,
    item: cartItem,
  });
  if (error) {
    throw error;
  } else {
    console.log(data);
  }
}

function useAddItemToCart() {
  return useMutation({
    mutationFn: addCartItem,
    onMutate: (variables) => {
      const oldCart = useCartStore.getState().cartItems;
      // mbe toastify adding item to cart
      // optimistic newCart

      // TODO
      // need to update using this optimistic newCart Item and not just upsert with the addded quantity
      useCartStore.getState().addCartItem({ cartItem: variables.cartItem });

      return [...oldCart];
    },
    onSettled: (data, error) => {
      // TODO toastify
      if (error) {
        // toastify Error occured
      } else {
        // toastify item added to cart
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
      useCartStore.getState().setCartItems(context);
    },
    scope: {
      id: "cart",
    },
  });
}
export default useAddItemToCart;
