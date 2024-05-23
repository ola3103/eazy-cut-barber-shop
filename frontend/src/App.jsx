import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./component/Layout";
import VerifyEmail from "./pages/VerifyEmail";
import Bookings from "./component/Bookings";
import UserHomePage from "./pages/UserHomePage";
import UserLayout from "./component/UserLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Layout>
              <VerifyEmail />
            </Layout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/bookings"
            element={
              <UserLayout>
                <Bookings />
              </UserLayout>
            }
          />
          <Route
            path="/home"
            element={
              <UserLayout>
                <UserHomePage />
              </UserLayout>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
