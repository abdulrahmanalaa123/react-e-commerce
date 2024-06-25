import { Navigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Outlet } from "react-router-dom";

function ProtectedWrapper() {
  const userData = useUserStore((state) => state.userData);

  if (userData === null) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <Outlet></Outlet>;
}

export default ProtectedWrapper;
