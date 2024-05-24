import { baseUrl } from "./config";

export const sendTokenPatroli = async (token) => {
  try {
    await fetch(`${baseUrl}/patrol/save-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
};

export const sendTokenAktivitas = async (token) => {
  try {
    await fetch(`${baseUrl}/aktivitas/save-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
};

export const sendTokenAtensi = async (token) => {
  try {
    await fetch(`${baseUrl}/atensi/save-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
};
