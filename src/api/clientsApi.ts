import axiosInstance from "./axiosInstance";

export interface TClient {
  id: string;
  inn: string;
  name: string;
}

export const getClients = async (): Promise<TClient[]> => {
  const response = await axiosInstance.get<TClient[]>("/clients/");
  return response.data;
};

export const getClientsByInn = async (inn: string): Promise<TClient[]> => {
  const response = await axiosInstance.get<TClient[]>(`/clients/?inn_like=${inn}`);
  return response.data;
};

export const getClient = async (clientId?: string): Promise<TClient> => {
  const response = await axiosInstance.get<TClient>(`/clients/${clientId}`);
  return response.data;
};

export const postClient = async (clientData: TClient): Promise<TClient> => {
  const response = await axiosInstance.post<TClient>("/clients/", clientData);
  return response.data;
};

export const putClient = async (clientId: string, updatedData: TClient): Promise<TClient> => {
  const response = await axiosInstance.put<TClient>(`/clients/${clientId}`, updatedData);
  return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  await axiosInstance.delete(`/clients/${clientId}`);
};