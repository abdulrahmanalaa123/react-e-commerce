import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoginButton() {
  const location = useLocation();
  return (
    <Link
      className="rounded-full text-text-input px-4 py-1 bg-text-300"
      to="/login"
      state={{ from: location }}
    >
      ShowModal
    </Link>
  );
}

export default LoginButton;
