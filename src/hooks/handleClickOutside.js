import { useEffect, useRef } from "react";

function useHandleClickOutisde(clickOutsideFunc) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        // contains looks for the target and its children and see if any of them is contained in the ref
        // thats why the ref is put on the parent element
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        clickOutsideFunc();
      }
    };
    // any click anywhere will trigger this due to event bubbling btw
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
}

export default useHandleClickOutisde;
