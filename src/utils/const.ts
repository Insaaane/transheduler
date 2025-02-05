const CLIENTS_INPUT_STYLE = { width: "230px" };
const RESERVATION_INPUT_STYLE = { width: "180px" };
const VEHICLE_INPUT_STYLE = { width: "180px" };

const RESERVATION_STATUS_OPTIONS = [
  { label: "Разгрузка", value: "in" },
  { label: "Погрузка", value: "out" },
];

const ANTD_THEME = {
  token: {
    fontFamily: "Roboto",
  },
};

const URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export {
  CLIENTS_INPUT_STYLE,
  RESERVATION_INPUT_STYLE,
  RESERVATION_STATUS_OPTIONS,
  VEHICLE_INPUT_STYLE,
  ANTD_THEME,
  URL
};
