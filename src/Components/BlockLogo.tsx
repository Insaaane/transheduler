import React from "react";
import logo from "../assets/Images/logo.png";

function BlockLogo() {
  return (
    <div className="login__header">
      <img className="logo" src={logo} alt="Логотип" />

      <div className="login__text--wrap">
        <p className="login__text">
          <b>Внутренний сервис</b>
        </p>

        <p className="login__text login__text--small">
          Бронирование погрузки/разгрузки автотранспорта
        </p>
      </div>
    </div>
  );
}

export default React.memo(BlockLogo);
