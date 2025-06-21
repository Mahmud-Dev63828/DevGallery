import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Database/firebase.config";
import libery from "../Libery/Lib";
import { validationField } from "../Validation/formValidation";

const SignIn = () => {
  const { InfoToast, SuccesToast, ErrorToast } = libery;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const { email, password } = formData;
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        SuccesToast("Login successful");
        navigate("/");
      })
      .catch((err) => {
        ErrorToast(err.code || "Login failed");
      })
      .finally(() => {
        setLoading(false);
        setFormData({ email: "", password: "" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg flex overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In to Your Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-8 w-[320px]"
          >
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm mt-8 text-gray-700">
            Don’t have an account?{" "}
            <NavLink to="/signup">
              <span className="font-bold text-black cursor-pointer">
                Sign up
              </span>
            </NavLink>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/01/0c/36/010c36c9ff864ab8fbf39922f68d22cd.jpg"
            alt="Sign In illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
