import { Link } from "react-router-dom";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const handleNavView = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="nav_bar">
      <div className="navbar_container container">
        <Link to="/" className="navbar_link navbar_logo">
          <img
            src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651939/logo_btwft1.png"
            alt="logo"
            className="logo"
          />
        </Link>
        <ul
          className={
            showNav ? "open_navbar navbar_items" : "close_navbar navbar_items"
          }
        >
          <li className="single_navbar_item">
            <Link to="/sign-in" className="navbar_link">
              Book Appointment
            </Link>
          </li>
          <li className="single_navbar_item">
            <Link to="/sign-in" href="" className="navbar_link">
              Log In
            </Link>
          </li>
          <li className="single_navbar_item">
            <Link to="/sign-up" href="" className="navbar_link">
              Register
            </Link>
          </li>
        </ul>
        <button onClick={handleNavView} className="menu_icon_btn">
          {!showNav ? <MdMenu /> : <MdClose />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
