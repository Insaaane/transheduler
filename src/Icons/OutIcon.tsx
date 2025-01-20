import { Tooltip } from "antd";
import React from "react";

function OutIcon() {
  return (
    <Tooltip title="Погрузка">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="20"
        viewBox="0 0 28 22"
        fill="none"
      >
        <path
          d="M0.292893 11.7071C-0.097631 11.3166 -0.0976311 10.6834 0.292893 10.2929L6.65685 3.92893C7.04738 3.53841 7.68054 3.53841 8.07107 3.92893C8.46159 4.31946 8.46159 4.95262 8.07107 5.34315L2.41421 11L8.07107 16.6569C8.46159 17.0474 8.46159 17.6805 8.07107 18.0711C7.68054 18.4616 7.04738 18.4616 6.65685 18.0711L0.292893 11.7071ZM26 12L1 12L1 10L26 10L26 12Z"
          fill="currentColor"
        />
        <line x1="27" x2="27" y2="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    </Tooltip>
  );
}

export default React.memo(OutIcon);
