import axios from "axios";
import { baseUrl } from "./config";
import { compressImage } from "../utils/CompressImage";

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
  nama_lengkap,
  username,
  latitude,
  longitude,
  lokasi_absen,
  savedPhoto,
}) => {
  try {
    const compressed = await compressImage(savedPhoto.uri);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("nama_lengkap", nama_lengkap);
    formData.append("username", username);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("lokasi_absen", lokasi_absen);
    formData.append("image", {
      uri: compressed.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    const response = await axios.post(
      `${baseUrl}/absensi/absen_masuk`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const addAbsenKeluar = async ({ userId }) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    const response = await axios.post(
      `${baseUrl}/absensi/absen_keluar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
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
