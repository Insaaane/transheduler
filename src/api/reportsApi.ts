// import dayjs from "dayjs";
import axiosInstance from "./axiosInstance";

export interface TReport {
  key: string;
  time: string;
  weight1: number;
  weight2: number;
  weight3: number;
  weight4: number;
  weight5: number;
  weight6: number;
}

//TODO: Добавить поиск по дате
export const getReports = async (status: string): Promise<TReport[]> => {
  const response = await axiosInstance.get<TReport[]>("/reports/", {
    params: {
      // dateTime: dayjs(new Date()).toJSON(),
      status: status,
    },
  });
  return response.data;
};
