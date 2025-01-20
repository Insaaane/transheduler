import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  }
}

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await axiosInstance.post<LoginResponse>("/login/", data);

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));
};

export const logout = () => {
  localStorage.clear();
};