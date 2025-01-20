import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

function Sidemenu() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="menu--wrap">
        <nav className="menu">
          <ul className="menu__items">
            <li
              className={`menu__item ${
                (location.pathname.startsWith("/reservations") ||
                  location.pathname === "/") && "active"
              }`}
              onClick={() => navigate("./reservations")}
            >
              Брони
            </li>

            <li
              className={`menu__item ${location.pathname.startsWith("/vehicles") && "active"}`}
              onClick={() => navigate("./vehicles")}
            >
              Транспортные средства
            </li>

            <li
              className={`menu__item ${location.pathname.startsWith("/clients") && "active"}`}
              onClick={() => navigate("./clients")}
            >
              Владельцы
            </li>

            <li
              className={`menu__item ${location.pathname.startsWith("/reports") && "active"}`}
              onClick={() => navigate("./reports")}
            >
              Отчеты
            </li>
          </ul>
        </nav>

        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default React.memo(Sidemenu);
