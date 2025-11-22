import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";

function TaskCreatingModal({isOpen, onClose, onSubmit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = () => {
        if (!title || !dueDate) {
            alert("Title and Due Date are required!");
            return;
        }

        // Format dueDate to YYYY-MM-DD
        const formattedDueDate = dueDate
            ? new Date(dueDate).toISOString().split("T")[0]
            : null;

        onSubmit({
            title,
            description,
            due_date: formattedDueDate, // Match the field name expected by the backend
            priority,
        });
        console.log(formattedDueDate);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                <div
                    className={`bg-white/50 backdrop-blur-lg p-5 rounded-lg shadow-lg w-95 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-950">Add New Task</h2>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md mb-3 text-gray-300 placeholder:text-gray-600"
                    />

                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md mb-3 text-gray-300 placeholder:text-gray-600"
                    ></textarea>

                    <DatePicker
                        label="Select Due Date"
                        value={dueDate}
                        onChange={(newDate) => setDueDate(newDate)}
                        sx={{
                            width: "100%",
                            mb: 2,
                            "@media (max-width: 640px)": {width: "90%"},
                            "@media (min-width: 641px) and (max-width: 1024px)": {width: "95%"},
                        }}
                        slotProps={{
                            desktopPaper: {
                                sx: {
                                    maxHeight: "45vh",
                                    overflowY: "auto",
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    transform: "translateY(8px)",
                                    "@media (max-width: 640px)": {maxHeight: "40vh"},
                                },
                            },
                        }}
                        PopperProps={{
                            placement: "bottom-start",
                            modifiers: [
                                {
                                    name: "preventOverflow",
                                    enabled: true,
                                    options: {
                                        boundary: "viewport",
                                    },
                                },
                            ],
                        }}
                    />

                    <div className="mb-4">
                        <label className="block font-medium text-gray-800 mb-2">Priority:</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 border rounded-md text-gray-500"
                        >
                            <option value="High">🔥 High</option>
                            <option value="Medium">🔆 Medium</option>
                            <option value="Low">🌱 Low</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-500 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default TaskCreatingModal;