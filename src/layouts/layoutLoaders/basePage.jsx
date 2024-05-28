import me from "../../api/auth/me";
import useCartStore from "../../stores/cart";

import useUserStore from "../../stores/user";

const baseLayoutLoader = async () => {
  // this is to fix inconsistencies of token expiring and still having your userData
  // probably will not happen with autoRefresh = true but its a safety net
  try {
    const userSession = await me();
    if (userSession === null) {
      throw "User not found";
    }
  } catch (e) {
    useUserStore.getState().deleteUserData();
    useCartStore.getState().clearCartItems();
  }
  return null;
};
export default baseLayoutLoader;
