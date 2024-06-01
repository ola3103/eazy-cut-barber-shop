import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import notification from "../utils/notification";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serviceData, setServiceData] = useState([]);

  const getServiceData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_BASE_URL_PROD
        }/api/v1/service`
      );
      setServiceData(response.data.data);
    } catch (error) {
      notification({ message: error.response.data.message, status: "error" });
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleUserAndAuth = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_BASE_URL_PROD
        }/api/v1/auth/me`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.data);
      console.log(response.data.data);
      setIsLoggedIn(true);
      return response;
    } catch (error) {
      console.log(error.response);
      notification({ message: error.response.data.message, status: "error" });
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/bookings") {
      handleUserAndAuth();
      getServiceData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        setIsLoggedIn,
        serviceData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const GlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext };
