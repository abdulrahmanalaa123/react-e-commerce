import * as React from "react";
const SvgArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="inherit"
      d="M9.593 13.44 16 7 9.593.56a.667.667 0 1 0-.926.94l4.793 4.833H.707a.667.667 0 1 0 0 1.334H13.46L8.667 12.5a.667.667 0 0 0 .946.94z"
    />
  </svg>
);
export default SvgArrow;
