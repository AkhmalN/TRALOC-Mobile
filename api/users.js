import axios from "axios";
import { baseUrl } from "./config";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};
