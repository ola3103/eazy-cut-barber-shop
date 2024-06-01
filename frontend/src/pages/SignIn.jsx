import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GlobalUserContext } from "../context/UserContext";
import * as apiClient from "../utils/apiClient";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, setIsLoggedIn } = GlobalUserContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await apiClient.handleSignIn(data);
    if (response.data.status === "success") {
      setIsLoggedIn(true);
      // setUser(response.data.data);
      navigate("/home");
    }
  };

  return (
    <form
      className="sign_in_form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="form_container">
        <h1 className="form_header">Sign in here</h1>
        <p className="form_subtitle">Sign in to book an appointment</p>
        <label className="form_label">
          Email
          <input
            {...register("email", { required: "Please provide your email" })}
            className="form_input"
            type="email"
          />
          {errors.email && (
            <span className="form_error">{errors.email.message}</span>
          )}
        </label>
        <label className="form_label">
          Password
          <input
            {...register("password", {
              required: "Please provide your password",
              minLength: {
                value: 6,
                message: "Password cannot be less than 6 characters",
              },
            })}
            className="form_input"
            type="password"
          />
          {errors.password && (
            <span className="form_error">{errors.password.message}</span>
          )}
        </label>
        <button className="form_btn">SIGN IN</button>
        <p className="form_text">
          Don&apos;t have an account ?
          <Link className="form_link" to="/sign-up">
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
