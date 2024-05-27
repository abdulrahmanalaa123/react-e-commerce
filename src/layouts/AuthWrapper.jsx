import { Navigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthModal from "../components/modals/AuthModal";
function AuthWrapper() {
  const userData = useUserStore((state) => state.userData);
  const location = useLocation();

  if (userData !== null) {
    return <Navigate to={location.state?.from?.pathname ?? "/"} />;
  }
  return (
    <AuthModal open={true}>
      <Outlet></Outlet>
    </AuthModal>
  );
}

export default AuthWrapper;
