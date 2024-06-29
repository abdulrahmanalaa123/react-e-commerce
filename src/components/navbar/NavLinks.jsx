import { NavLink } from "react-router-dom";

function NavLinks({ size }) {
  return (
    <>
      <NavLink to="/">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Home
          </div>
        )}
      </NavLink>
      <NavLink to="/products/Plants">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:content-[''] after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Plants
          </div>
        )}
      </NavLink>
      <NavLink to="/products/GardenSupplies">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Garden Supplies
          </div>
        )}
      </NavLink>
      <NavLink to="/products/Seeds">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Seeds
          </div>
        )}
      </NavLink>
      <NavLink to="/pots">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Pots
          </div>
        )}
      </NavLink>
      <NavLink to="/contact-us">
        {({ isActive, isPending }) => (
          <div
            data-state={isActive ? "active" : isPending ? "pending" : ""}
            data-size={size}
            className="data-[state=active]:text-text-300 data-[size=large]:text-md data-[state=active]:font-bold text-start w-fit relative text-text-200 font-normal hover:font-bold hover:text-text-300 hover:transition-all duration-300 ease-in-out
         after:absolute after:left-[15%] after:bottom-0 after:w-[70%] after:h-[2px] after:bg-primary-300 after:opacity-0 data-[state=active]:after:opacity-100 hover:after:opacity-100"
          >
            Contact us
          </div>
        )}
      </NavLink>
    </>
  );
}

export default NavLinks;
