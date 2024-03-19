import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getUserAbsen = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/absensi/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};

export const getUserAbsenLength = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/absensi/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};

export default getUserAbsen;
