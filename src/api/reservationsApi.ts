import axiosInstance from "./axiosInstance";
import { TVehicle } from "./vehiclesApi";

export type TStatus = "in" | "out";

export interface TWarehouse {
  id: string;
  name: string;
};

export interface TReservation {
  id: string;
  status: TStatus;
  dateTime: string;
  vehicle: TVehicle;
  warehouse: TWarehouse;
};

export const getReservations = async (): Promise<TReservation[]> => {
  const response = await axiosInstance.get<TReservation[]>("/reservations/");
  return response.data;
};

export const getReservationsByOwnername = async (ownerName: string): Promise<TReservation[]> => {
  const response = await axiosInstance.get<TReservation[]>(`/reservations/?vehicle.owner.name_like=${ownerName}`);
  return response.data;
};

export const getReservation = async (reservationId: string): Promise<TReservation> => {
  const response = await axiosInstance.get<TReservation>(`/reservations/${reservationId}`);
  return response.data;
};

export const postReservation = async (reservationData: TReservation): Promise<TReservation> => {
  const response = await axiosInstance.post<TReservation>("/reservations/", reservationData);
  return response.data;
};

export const putReservation = async (reservationId: string, updatedData: TReservation): Promise<TReservation> => {
  const response = await axiosInstance.put<TReservation>(`/reservations/${reservationId}`, updatedData);
  return response.data;
};

export const deleteReservation = async (reservationId: string): Promise<void> => {
  await axiosInstance.delete(`/reservations/${reservationId}`);
};

export const getWarehouses = async (): Promise<TWarehouse[]> => {
  const response = await axiosInstance.get<TWarehouse[]>("/warehouses/");
  return response.data;
};