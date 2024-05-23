import { Outlet, useNavigate } from "react-router-dom";
import { GlobalUserContext } from "../context/UserContext";
import Loader from "../component/Loader";

const ProtectedRoute = () => {
  const { isLoggedIn } = GlobalUserContext();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return <Loader />;
  }

  return isLoggedIn ? <Outlet /> : navigate("/sign-in");
};

export default ProtectedRoute;
