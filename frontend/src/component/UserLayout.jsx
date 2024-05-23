import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
