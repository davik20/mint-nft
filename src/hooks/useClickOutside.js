import React, { useEffect, useRef } from "react";
// listens clicks outside a Dom element, ignores dom elements passed as an array
function useClickOutside(target, func) {
  useEffect(() => {
    let listener = (e) => {
      if (!target.current?.contains(e.target)) {
        func();
      }
    };

    document.addEventListener("click", listener);
    console.log(listener);

    return () => {
      console.log("unmounting");
      document.removeEventListener("click", listener, true);
    };
  }, [target]);
}

export default useClickOutside;
