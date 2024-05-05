// defaults for my stale queries since putting the rules in queryClient would enforce them on all and
// thats not the intended behaviour its a cheeky solution instead of option for multiple clietns or a solution i didnt understand

export const productFetchingConfig = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retry: true,
  retryOnMount: true,
  retryDelay: (attempt) =>
    Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
  //10 mins
  staleTime: 10 * 60 * 1000,
};

export const filterOptionsConfig = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retry: true,
  retryOnMount: true,
  retryDelay: (attempt) =>
    Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
  // doesnt go stale since they basically do not change
  staleTime: Infinity,
  // 1 hour if not used discard them since all of them combined can be to be 10 requests
  // counting subcategories and colors,sizes etc. per category
  gcTime: 60 * 60 * 1000,
};
