import { useEffect, useRef } from "react";

function useHandleClickOutisde(clickOutsideFunc) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        // contains looks for the target and its children and see if any of them is contained in the ref
        // thats why the ref is put on the parent element
        (ref.current && !ref.current.contains(e.target)) ||
        (ref.current &&
          e.target.innerHTML &&
          !ref.current.contains(e.target.innerHTML))
      ) {
        clickOutsideFunc();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
}

export default useHandleClickOutisde;
