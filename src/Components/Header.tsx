import React from "react";
import BlockLogo from "./BlockLogo";
import LogoutIcon from "../Icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { logout } from "../api/authApi";

function Header() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user")!);

  const logoutHandler = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="header">
      <BlockLogo />

      <Tooltip title="Выйти из аккаунта">
        <div className="header__logout" onClick={logoutHandler}>
          <p className="header__logout_text">{userInfo.name}</p>
          <LogoutIcon />
        </div>
      </Tooltip>
    </div>
  );
}

export default React.memo(Header);
