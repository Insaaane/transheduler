import axiosInstance from "./axiosInstance";
import { TClient } from "./clientsApi";

export interface TVehicle {
  id: string;
  carBrand: string;
  carNumber: string;
  weight: number;
  owner: TClient;
}

export const getVehicles = async (): Promise<TVehicle[]> => {
  const response = await axiosInstance.get<TVehicle[]>("/vehicles/");
  return response.data;
};

export const getVehiclesByCarNumber = async (carNumber: string): Promise<TVehicle[]> => {
  const response = await axiosInstance.get<TVehicle[]>(`/vehicles/?carNumber_like=${carNumber}`);
  return response.data;
};

export const getVehicle = async (vehicleId?: string): Promise<TVehicle> => {
  const response = await axiosInstance.get<TVehicle>(`/vehicles/${vehicleId}`);
  return response.data;
};

export const postVehicle = async (vehicleData: TVehicle): Promise<TVehicle> => {
  const response = await axiosInstance.post<TVehicle>("/vehicles/", vehicleData);
  return response.data;
};

export const putVehicle = async (vehicleId: string, updatedData: TVehicle): Promise<TVehicle> => {
  const response = await axiosInstance.put<TVehicle>(`/vehicles/${vehicleId}`, updatedData);
  return response.data;
};

export const deleteVehicle = async (vehicleId: string): Promise<void> => {
  await axiosInstance.delete(`/vehicles/${vehicleId}`);
};