import BookingForm from "../component/BookingForm";
import Loader from "../component/Loader";
import ServicesAndPrice from "../component/ServicesAndPrice";
import { GlobalUserContext } from "../context/UserContext";

const UserHomePage = () => {
  const { user } = GlobalUserContext();

  if (!user) {
    return <Loader />;
  }

  return (
    <section className="user_homepage">
      <p className="user_homepage_welcome_text container">
        Welcome {user.fullName}
      </p>
      <div className="user_homepage_container container">
        <BookingForm />
        <ServicesAndPrice />
      </div>
    </section>
  );
};

export default UserHomePage;
