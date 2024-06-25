import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { filterOptionsConfig } from "../../lib/react-query";

async function cartProduct(cartItem) {
  const { data, error } = await supabase.rpc("get_cart_item_details", {
    item: cartItem,
  });
  if (!error) {
    return data;
  } else {
    console.log(error);
  }
}

export const cartItemDetailsQuery = (cartItem) => {
  const { qty, ...item } = cartItem;
  return queryOptions({
    queryKey: ["cart_details", { ...item }],
    queryFn: () => cartProduct(cartItem),
    ...filterOptionsConfig,
  });
};

export const getCartItemDetails = (cartItems) => {
  return useQueries({
    queries: cartItems.map((item) => cartItemDetailsQuery(item)),
    combine: (results) => {
      return {
        // could use flat but to not fuck up the indeces it will remove empty arrays
        data: results.map((result, index) =>
          result.data ? { ...result.data[0], ...cartItems[index] } : {}
        ),
        pending: results.some((result) => result.isPending),
        loading: results.some((result) => result.isLoading),
        error: results.find((result) => result.isError),
        isSuccess: results.every((result) => result.isSuccess),
        refetch: () => results.forEach((result) => result.refetch()),
      };
    },
  });
};
