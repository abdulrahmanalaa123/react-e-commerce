// defaults for my stale queries since putting the rules in queryClient would enforce them on all and
// thats not the intended behaviour its a cheeky solution instead of option for multiple clietns or a solution i didnt understand

import { QueryClient } from "@tanstack/react-query";

export const productFetchingConfig = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  // retry: true,
  // retryOnMount: true,

  //10 mins and gcTime by default is 5mins just to not overload the cache
  staleTime: 10 * 60 * 1000,
};

export const filterOptionsConfig = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  // retry: true,
  // retryOnMount: true,

  // doesnt go stale since they basically do not change
  staleTime: Infinity,
  // 1 hour if not used discard them since all of them combined can be up to be 10 requests
  // counting subcategories and colors,sizes etc. per category
  gcTime: 60 * 60 * 1000,
};

export const defaultConfig = {
  queries: {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    //1 minute default staleTime
    staleTime: 1000 * 60,
  },
};
const queryClient = new QueryClient({ defaultOptions: defaultConfig });
export default queryClient;
