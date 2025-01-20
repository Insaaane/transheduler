import { TVehicle } from "../api/vehiclesApi";
import { TReservation, TWarehouse } from "../api/reservationsApi";
import dayjs from "dayjs";
import { TClient } from "../api/clientsApi";

type TWithKey<T> = T & { key: string };

type TOption = {
  value: string;
  label: string;
};

export const transformData = <T extends { id: string }>(data: T[]): TWithKey<T>[] => {
  return data.map((item) => ({
    ...item,
    key: item.id,
  }));
};

export const transformVehicles = (data: TVehicle[]) => {
  return data.map((item) => {
    return {
      key: item.id,
      carBrand: item.carBrand,
      carNumber: item.carNumber,
      weight: item.weight,
      owner: item.owner.name,
    };
  });
};

export const transformReservations = (data: TReservation[]) => {
  return data.map((item) => {
    return {
      key: item.id,
      status: item.status,
      dateTime: item.dateTime,
      carBrand: item.vehicle.carBrand,
      carNumber: item.vehicle.carNumber,
      weight: item.vehicle.weight,
      owner: item.vehicle.owner.name,
      warehouse: item.warehouse.name,
    };
  });
};

export const vehiclesToOptions = (vehicles: TVehicle[]): TOption[] => {
  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.id,
    label: `${vehicle.owner.name} ${vehicle.carNumber} ${vehicle.carBrand}`,
  }));

  return vehicleOptions;
};

export const warehousesToOptions = (warehouses: TWarehouse[]): TOption[] => {
  const vehicleOptions = warehouses.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.name,
  }));

  return vehicleOptions;
};

export const clientsToOptions = (clients: TClient[]): TOption[] => {
  const vehicleOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  return vehicleOptions;
};

export const transformDateTimeToServer = (date: string, time: string) => {
  return dayjs(
    dayjs(date).format("YYYY-MM-DD") + " " + dayjs(time).format("HH:mm")
  ).toJSON();
};
