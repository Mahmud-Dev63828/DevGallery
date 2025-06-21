import React, { useState, useContext } from "react";
import { validationField } from "../Validation/formValidation";
import { NavLink } from "react-router-dom";
import { ref, set } from "firebase/database";
import libery from "../Libery/Lib";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { db, auth } from "../../Database/firebase.config";
import { setFirebaseData } from "../Utils/upload.utils";

const SignUp = () => {
  const { InfoToast, SuccesToast, ErrorToast } = libery;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [`${name}Error`]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validationField(formData, setErrors);
    if (!isValid) return;

    const { email, password, name } = formData;
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        SuccesToast("Registration successful");

        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600",
        });
      })
      .then(() => {
        const userData = {
          userid: auth.currentUser.uid,
          username: auth.currentUser.displayName || name,
          email: auth.currentUser.email || email,
          profile_picture:
            auth.currentUser.photoURL ||
            "https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600",
        };

        return setFirebaseData(`users/`, userData);
      })
      .then((mailData) => {
        return sendEmailVerification(auth.currentUser);
      })
      .then(() => {
        InfoToast(`${name}, please check your email for verification`);
        console.log("Verification email sent successfully");
      })
      .catch((err) => {
        ErrorToast(err.code);
      })
      .finally(() => {
        setLoading(false);
        setFormData({ name: "", email: "", password: "" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg flex overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-8 w-[320px]"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-[320px] h-[44px] border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.nameError && (
                <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-[320px] h-[44px] border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.emailError && (
                <p className="text-red-500 text-sm mt-1">{errors.emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-[320px] h-[44px] border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordError}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-[320px] h-[44px] bg-[#419e5b] hover:bg-[#ff8686] text-white font-semibold rounded-lg transition"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm mt-8 text-gray-700">
            Already have an account?{" "}
            <NavLink to="/signin" end>
              <span className="font-bold text-black cursor-pointer">
                Log in
              </span>
            </NavLink>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/01/0c/36/010c36c9ff864ab8fbf39922f68d22cd.jpg"
            alt="Signup image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
