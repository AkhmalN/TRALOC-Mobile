import axios from "axios";
import { baseUrl } from "./apiConfig";

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

export const getUserPatroliLength = async (userId) => {
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

export const addPatroli = async ({
  userId,
  username,
  scannedLabel,
  selectedItem,
  notes,
  scannedLatitude,
  scannedLongitude,
  savedPhoto,
}) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("location", scannedLabel);
    formData.append("status", selectedItem);
    formData.append("notes", notes);
    formData.append("latitude", scannedLatitude);
    formData.append("longitude", scannedLongitude);
    formData.append("image", {
      uri: savedPhoto.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    const response = await axios.post(`${baseUrl}/patrol/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response) {
      return response.status;
    }
  } catch (error) {
    throw new Error(error);
  }
};
