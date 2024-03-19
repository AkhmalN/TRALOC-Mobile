import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/${userId}`);
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};
