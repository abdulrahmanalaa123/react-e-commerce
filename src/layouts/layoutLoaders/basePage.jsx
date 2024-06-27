import me from "../../api/auth/me";
import syncCart from "../../api/cart/syncCart";

import useUserStore from "../../stores/user";

const baseLayoutLoader = async () => {
  try {
    console.log("chekc user");
    const userSession = await me();
    if (userSession === null && useUserStore.getState().userData !== null) {
      throw "User not found";
    }
  } catch (e) {
    useUserStore.getState().deleteUserData();
  }
  return null;
};
export default baseLayoutLoader;
