import React, { useState, useEffect } from "react";
import placeholder from "../../assets/placeholder.png" ;
import api from "../utils/api";

function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    avatar: "https://via.placeholder.com/150", // Placeholder avatar
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/user/")
      .then((response) => {
        setUser({
          username: response.data.username,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          age: response.data.age,
          gender: response.data.gender,
          avatar: "https://via.placeholder.com/150", // Placeholder for now
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8 text-center animate-fade-in">
          {loading ? (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 animate-pulse"></div>
          ) : (
            <img
              src={placeholder}
              alt="Profile Avatar"
              className="w-24 h-24 p-1 rounded-full mx-auto mb-4 border-4 border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          )}
          <h1 className="text-2xl font-semibold text-gray-800">
            {loading ? "Loading..." : `Welcome, ${user.username}!`}
          </h1>
          <p className="text-gray-600 mt-2">Your Personal Profile</p>
        </header>

        {/* User Information */}
        <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-medium text-gray-800 mb-4 border-b-2 border-blue-100 pb-2">
            Your Details
          </h2>
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-medium text-gray-900">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium text-gray-900">First Name:</span> {user.first_name}
              </p>
              <p>
                <span className="font-medium text-gray-900">Last Name:</span> {user.last_name}
              </p>
              <p>
                <span className="font-medium text-gray-900">Age:</span> {user.age}
              </p>
              <p>
                <span className="font-medium text-gray-900">Gender:</span> {user.gender}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// Add CSS animations to frontend/src/index.css
export default ProfilePage;