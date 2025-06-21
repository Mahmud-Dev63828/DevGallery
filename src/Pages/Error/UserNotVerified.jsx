import { useNavigate } from "react-router-dom";

const UserNotVerified = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Icon or Warning */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Email Not Verified
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your account is not verified yet. Please check your email inbox and
          verify to continue using the platform.
        </p>

        {/* Action Button */}
        <button
          onClick={handleBackToLogin}
          className="inline-flex items-center justify-center px-5 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition"
        >
          Go Back to Login
        </button>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-sm text-gray-500">
          If you think this is a mistake, please{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            contact support
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default UserNotVerified;
