import React, { useState, useEffect } from "react";
import TaskCreatingModal from "./TaskCreatingModal";
import TaskCard from "../UI/TaskCard.jsx";
import api from "../utils/api";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get("/api/tasks/")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = (newTask) => {
    api
      .post("/api/tasks/", newTask)
      .then((response) => setTasks((prevTasks) => [...prevTasks, response.data]))
      .catch((error) => console.error("Error adding task:", error));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Intro Poster */}
        <section className="relative mb-12 p-8 rounded-xl shadow-2xl bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <h1 className="text-6xl font-extrabold tracking-tight text-center drop-shadow-lg">
            Conquer Your Day
          </h1>
          <p className="text-xl text-center mt-4 italic font-light">
            A to-do list app that’s out of this world.
          </p>
        </section>

        {/* Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Poster 1: Task Creation */}
          <div className="relative p-6 rounded-lg bg-gradient-to-t from-yellow-400 to-orange-500 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="absolute top-2 right-2 text-5xl opacity-30">✨</div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Craft Your Tasks</h2>
            <p className="text-gray-800">
              Add tasks with priorities, due dates, and notes—your mission starts here!
            </p>
          </div>

          {/* Poster 2: Calendar Magic */}
          <div className="relative p-6 rounded-lg bg-gradient-to-t from-teal-400 to-blue-500 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="absolute top-2 right-2 text-5xl opacity-30">🌌</div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Time Travel</h2>
            <p className="text-gray-800">
              Filter tasks with an interactive calendar—navigate your timeline effortlessly.
            </p>
          </div>

          {/* Poster 3: Victory Check */}
          <div className="relative p-6 rounded-lg bg-gradient-to-t from-green-400 to-emerald-500 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="absolute top-2 right-2 text-5xl opacity-30">🏆</div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Claim Success</h2>
            <p className="text-gray-800">
              Check off tasks with a single click—celebrate every win!
            </p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <section className="p-8 bg-indigo-800 bg-opacity-80 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Launch Protocol</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-2xl bg-yellow-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">1</span>
              <p>Blast off by clicking "+ Add New Task" to create your first mission.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl bg-teal-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">2</span>
              <p>Navigate the cosmos using the sidebar: Dashboard, Tasks, Calendar.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl bg-green-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">3</span>
              <p>Expand task cards to tweak details or mark your victories.</p>
            </div>
          </div>
        </section>

        {/* Placeholder for Today's Tasks */}
        <div className="mt-12 p-6 bg-gray-900 bg-opacity-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Today’s Missions</h2>
          <p className="text-gray-300">Task list coming soon—stay tuned!</p>
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all cursor-pointer"
      >
        + Add New Task
      </button>
      <TaskCreatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}

export default Dashboard;