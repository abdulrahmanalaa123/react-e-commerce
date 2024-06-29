import Logout from "../../assets/svgs/logout.svg";
import signOut from "../../api/auth/signOut";
import useUserStore from "../../stores/user";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function AuthButtons() {
  const userData = useUserStore((state) => state.userData);
  const location = useLocation();

  return (
    <>
      {userData === null ? (
        <>
          <Link
            to="/login"
            state={{ from: location }}
            className="px-6 py-2 text-center border border-black  rounded-sm text-[14px] peer-hover:bg-black peer-hover:text-white hover:bg-black hover:text-white transition-colors duration-150 relative "
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 text-center border  border-black  bg-black text-white   rounded-sm text-[14px] hover:bg-white  hover:text-black transition-colors duration-150 relative 
                          "
          >
            SignUp
          </Link>
        </>
      ) : (
        <button
          onClick={async () => {
            await signOut();
          }}
          className="flex-shrink-0"
        >
          <img src={Logout} className="w-full h-full object-contain" />
        </button>
      )}
    </>
  );
}

export default AuthButtons;
