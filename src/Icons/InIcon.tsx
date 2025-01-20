import { Tooltip } from "antd";
import React from "react";

function InIcon() {
  return (
    <Tooltip title="Разгрузка">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
      >
        <path
          d="M25.7071 11.7071C26.0976 11.3166 26.0976 10.6834 25.7071 10.2929L19.3431 3.92893C18.9526 3.53841 18.3195 3.53841 17.9289 3.92893C17.5384 4.31946 17.5384 4.95262 17.9289 5.34315L23.5858 11L17.9289 16.6569C17.5384 17.0474 17.5384 17.6805 17.9289 18.0711C18.3195 18.4616 18.9526 18.4616 19.3431 18.0711L25.7071 11.7071ZM-8.74228e-08 12L25 12L25 10L8.74228e-08 10L-8.74228e-08 12Z"
          fill="currentColor"
        />
        <line x1="27" x2="27" y2="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    </Tooltip>
  );
}

export default React.memo(InIcon);
