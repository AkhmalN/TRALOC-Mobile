import axios from "axios";
import { baseUrl } from "./config";
import { compressImage } from "../utils/CompressImage";

export const addAktivitas = async ({
  userId,
  username,
  nama_lengkap,
  instansi_aktivitas,
  pos_aktivitas,
  notes_aktivitas,
  savedPhoto,
}) => {
  try {
    const compressedImage = await compressImage(savedPhoto.uri);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("nama_lengkap", nama_lengkap);
    formData.append("instansi_aktivitas", instansi_aktivitas);
    formData.append("pos_aktivitas", pos_aktivitas);
    formData.append("notes_aktivitas", notes_aktivitas);
    formData.append("image", {
      uri: compressedImage.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    const response = await axios.post(`${baseUrl}/aktivitas/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserAktivitas = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/aktivitas/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data aktivitas");
    }
  }
};

export const deleteAktivitas = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/aktivitas/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
