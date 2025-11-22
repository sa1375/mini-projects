// src/components/DashboardHeader.jsx
import React from "react";
import { useUser } from "../context/UserContext";

export default function DashboardHeader() {
  const { user, username } = useUser();
  const today = new Date();

  return (
    <div className="p-4 items-center justify-between bg-gray-100 rounded-lg mb-4">
      <h1 className="text-xl font-bold">{`Hi ${username || user?.username || "Guest"}`}👋</h1>
      <p className="text-sm text-gray-800">{today.toString()}</p>
    </div>
  );
}