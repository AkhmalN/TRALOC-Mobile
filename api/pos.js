import axios from "axios";
import { baseUrl } from "./config";

export const GetPosByInstansi = async ({ lokasi_pos }) => {
  try {
    const response = await axios.get(
      `${baseUrl}/pos/lokasi?lokasi_pos=${lokasi_pos}`
    );
    return response.data.pos;
  } catch (error) {
    throw new Error(error);
  }
};
