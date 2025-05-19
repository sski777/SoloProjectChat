import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthStatusPage = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full border border-orange-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Welcome to Chat Room 💬</h1>
        <p className="text-gray-600 mb-6">Please log in to access your account and start messaging.</p>
        <button
          onClick={() =>
            loginWithRedirect({
              redirectUri: window.location.origin + "/",
            })
          }
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-md"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default AuthStatusPage;
