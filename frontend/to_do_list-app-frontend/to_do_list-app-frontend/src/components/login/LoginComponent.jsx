import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import api from "../utils/api"; // Import the configured axios instance

function LoginComponent({ setCurrentPage }) {
  const { setUser, setUsername } = useUser();
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setCurrentPage("dashboard");
    }
  }, [setCurrentPage]);

  useEffect(() => {
    setUsername(username);
  }, [username, setUsername]);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }
    try {
      const response = await api.post("/api/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("isLoggedIn", "1");
      setCurrentPage("dashboard");
      setUser({ username });
    } catch (error) {
      if (error.response) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else if (error.request) {
        setErrorMessage("503 Service Unavailable. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-800 relative overflow-hidden">
      <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-30 top-10 left-10"></div>
      <div className="absolute w-56 h-56 bg-green-300 rounded-full opacity-30 bottom-10 right-10"></div>

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg flex items-center">
        <div className="hidden md:block w-1/2 p-6">
          <h2 className="text-4xl font-bold text-gray-700">Welcome to your App</h2>
          <p className="text-gray-600 mt-4">
            Sign in to continue managing your tasks efficiently. Let's get started!
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Sign In</h2>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setLocalUsername(event.target.value)}
            className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentPage("register")}
            className="w-full mt-4 py-3 text-blue-600 font-medium bg-transparent border border-blue-400 rounded-lg hover:bg-blue-100 transition cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;