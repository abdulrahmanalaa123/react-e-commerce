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

      // might need to change to include cartId when logged in and include cartId inside each cartItem when logged in but it doesnt matter
      // that much rn
      useCartStore.getState().addCartItem({ cartItem: variables.cartItem });

      return [...oldCart];
    },
    onSettled: (_data, error) => {
      // TODO toastify
      if (error) {
        // toastify Error occured
      } else {
        // toastify item added to cart
      }
    },
    onError: (error, _variables, context) => {
      console.log(error);
      useCartStore.getState().setCartItems(context);
    },
    // not useful anymore since the current user journey doesnt allow it but will leave it just in case
    // throwOnError: (error) => {
    //   // this is the violation code of the rls
    //   if (error.code === "42501") {
    //     return true;
    //   }
    //   return false;
    // },
    scope: {
      id: "cart",
    },
  });
}
export default useAddItemToCart;
