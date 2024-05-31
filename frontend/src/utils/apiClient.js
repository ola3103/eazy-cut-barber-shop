import axios from "axios";
import notification from "./notification";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL ||
        import.meta.env.VITE_API_BASE_URL_PROD
      }/api/v1/auth/sign-up`,
      formData
    );
  } catch (error) {
    notification({ message: error.response.data.message, status: "error" });
  }
};

export const handleSignIn = async (formData) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL ||
        import.meta.env.VITE_API_BASE_URL_PROD
      }/api/v1/auth/sign-in`,
      formData,
      { withCredentials: true }
    );
    notification({ message: "Sign in successfully", status: "success" });
    return response;
  } catch (error) {
    notification({ message: error.response.data.message, status: "error" });
  }
};
