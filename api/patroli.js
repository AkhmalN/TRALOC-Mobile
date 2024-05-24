import axios from "axios";
import { baseUrl } from "./config";
import { compressImage } from "../utils/CompressImage";

export const getUserPatroli = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/patrol/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data patroli");
    }
  }
};

export const getAllPatroli = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/patrol/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data patroli");
    }
  }
};

export const addPatroli = async ({
  userId,
  user,
  namaLengkap,
  lokasiBarcode,
  namaInstansi,
  selectedItem,
  notes,
  savedPhoto,
}) => {
  try {
    const formData = new FormData();
    for (const images of savedPhoto) {
      const compressedImage = await compressImage(images);
      formData.append("image", {
        uri: compressedImage.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });
    }
    formData.append("userId", userId);
    formData.append("username", user);
    formData.append("lokasi_pos", lokasiBarcode);
    formData.append("nama_instansi", namaInstansi);
    formData.append("nama_lengkap", namaLengkap);
    formData.append("status", selectedItem);
    formData.append("notes", notes);
    const response = await axios.post(`${baseUrl}/patrol/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deletePatroli = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/patrol/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
