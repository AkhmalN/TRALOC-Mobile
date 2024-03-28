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

export const addAbsen = async ({
  userId,
  username,
  latitude,
  longitude,
  lokasi_absen,
  savedPhoto,
}) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("lokasi_absen", lokasi_absen);
    formData.append("image", {
      uri: savedPhoto.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    const response = await axios.post(`${baseUrl}/absensi/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAbsensi = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/absensi/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
