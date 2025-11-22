import React, { useState, useEffect, useMemo } from "react";
import TaskCard from "../UI/TaskCard";
import api from "../utils/api";
import Calendar from "../UI/Calendar";
import TaskCreatingModal from "../dashboard/TaskCreatingModal.jsx";

function TaskContainer() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

    useEffect(() => {
        setLoading(true);
        api
            .get("/api/tasks/")
            .then((response) => {
                setTasks(response.data);
                setFilteredTasks(response.data); // Initialize filteredTasks with all tasks
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            });
    }, []);

    // Memoize filtered tasks based on tasks and dateRange
    const memoizedFilteredTasks = useMemo(() => {
        if (!dateRange.startDate || !dateRange.endDate) return tasks; // Return all tasks if no date range is set
        return tasks.filter((task) => {
            const dueDate = new Date(task.due_date);
            return dueDate >= dateRange.startDate && dueDate <= dateRange.endDate;
        });
    }, [tasks, dateRange.startDate, dateRange.endDate]);

    const handleDateRangeChange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
        setFilteredTasks(memoizedFilteredTasks); // Update filteredTasks when date range changes
    };

    const handleComplete = (taskId, updatedTask) => {
        api
            .patch(`/api/tasks/${taskId}/`, updatedTask)
            .then((response) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task.id === taskId ? response.data : task))
                );
                // No need to update filteredTasks here; memoizedFilteredTasks will recompute
            })
            .catch((error) => console.error("Error completing task:", error));
    };

    const handleEdit = (taskId, updatedTask) => {
        api
            .patch(`/api/tasks/${taskId}/`, updatedTask)
            .then((response) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task.id === taskId ? response.data : task))
                );
                // No need to update filteredTasks here; memoizedFilteredTasks will recompute
            })
            .catch((error) => console.error("Error editing task:", error));
    };

    const handleDelete = (taskId) => {
        api
            .delete(`/api/tasks/${taskId}/`)
            .then(() => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                if (expandedTaskId === taskId) setExpandedTaskId(null);
                // No need to update filteredTasks here; memoizedFilteredTasks will recompute
            })
            .catch((error) => console.error("Error deleting task:", error));
    };

    const toggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    const handleAddTask = (newTask) => {
        api
            .post("/api/tasks/", newTask)
            .then((response) => {
                setTasks((prevTasks) => [...prevTasks, response.data]);
                // No need to update filteredTasks here; memoizedFilteredTasks will recompute
            })
            .catch((error) => console.error("Error adding task:", error));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
            </header>
            <div className="mb-8">
                <Calendar onDateRangeChange={handleDateRangeChange} tasks={tasks} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filtered Tasks</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {memoizedFilteredTasks.length > 0 ? (
                            memoizedFilteredTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onComplete={handleComplete}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    isExpanded={expandedTaskId === task.id}
                                    onToggleExpand={() => toggleExpand(task.id)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No tasks for the selected date range.</p>
                        )}
                    </div>
                )}
            </div>
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

export default TaskContainer;