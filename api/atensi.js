import { baseUrl } from "./config";
import axios from "axios";
export const createAtensi = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/atensi/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAtensi = async () => {
  try {
    const response = await axios.get(`${baseUrl}/atensi/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};
export const getUserAtensi = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/atensi/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};
export const deleteAtensi = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/atensi/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
