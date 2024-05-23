import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import * as apiClient from "../utils/apiClient";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    apiClient.registerUser(data);
    reset();
    setIsModalOpen(true);
  };

  const handleModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="form_page">
      {isModalOpen && (
        <div className="check_email_popup" onClick={handleModal}>
          <div className="check_email_popup_container">
            <button className="close_check_email_popup" onClick={handleModal}>
              <MdClose />
            </button>
            <img
              src="https://res.cloudinary.com/dxaujswz7/image/upload/v1714651938/check_email_slz58u.png"
              alt="check_email"
              className="check_email_img"
            />
            <p className="check_email_text">
              Kindly check your email inbox and click on the verification link
              that has been sent to confirm your account.
            </p>
            <button className="check_email_ok_btn" onClick={handleModal}>
              OK
            </button>
          </div>
        </div>
      )}

      <form
        className="sign_in_form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="form_container">
          <h1 className="form_header">Get Started</h1>
          <p className="form_subtitle">Create your account now</p>
          <label className="form_label">
            Full name
            <input
              {...register("fullName", {
                required: "Please provide your full name",
              })}
              className="form_input"
              type="text"
            />
            {errors.fullName && (
              <span className="form_error">{errors.fullName.message}</span>
            )}
          </label>
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
          <button className="form_btn">CREATE ACCOUNT</button>
          <p className="form_text">
            Already have an account ?
            <Link className="form_link" to="/sign-in">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
