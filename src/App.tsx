import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

import Loader from "./Components/Loader";
import PrivateRoute from "./utils/privateRoute";
import { ANTD_THEME } from "./utils/const";

const Login = lazy(() => import("./pages/Login"));
const Sidemenu = lazy(() => import("./Components/Sidemenu"));
const Reservations = lazy(() => import("./pages/Reservations"));
const Vehicles = lazy(() => import("./pages/Vehicles"));
const Clients = lazy(() => import("./pages/Clients"));
const Reports = lazy(() => import("./pages/Reports"));
const EditReservation = lazy(() => import("./pages/EditReservation"));
const EditVehicles = lazy(() => import("./pages/EditVehicles"));
const EditClients = lazy(() => import("./pages/EditClients"));

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider componentSize="large" theme={ANTD_THEME} locale={ruRU}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Sidemenu />}>
                <Route index element={<Reservations />} />

                <Route path="reservations">
                  <Route index element={<Reservations />} />
                  <Route path="new" element={<EditReservation />} />
                  <Route path=":reservationId" element={<EditReservation />} />
                </Route>

                <Route path="vehicles">
                  <Route index element={<Vehicles />} />
                  <Route path="new" element={<EditVehicles />} />
                  <Route path=":vehicleId" element={<EditVehicles />} />
                </Route>

                <Route path="clients">
                  <Route index element={<Clients />} />
                  <Route path="new" element={<EditClients />} />
                  <Route path=":clientId" element={<EditClients />} />
                </Route>

                <Route path="reports" element={<Reports />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ConfigProvider>
    </BrowserRouter>
  );
}
