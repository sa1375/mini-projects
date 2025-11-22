import {useState} from "react";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline" ;

export default function TaskCard({
                                     task,
                                     onComplete,
                                     onEdit,
                                     onDelete,
                                     isExpanded,
                                     onToggleExpand,
                                 }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const getCardGradient = () => {
        switch (task.priority) {
            case "High":
                return "bg-gradient-to-br from-orange-500 to-red-400";
            case "Medium":
                return "bg-gradient-to-br from-teal-600 to-blue-500";
            case "Low":
                return "bg-gradient-to-br from-green-600 to-emerald-500";
            default:
                return "bg-gradient-to-br from-gray-400 to-gray-500";
        }
    };

    const handleComplete = (e) => {
        e.stopPropagation();
        onComplete(task.id, {completed: !task.completed});
    };

    const handleSave = (e) => {
        e.stopPropagation();
        setIsEditing(false);
        onEdit(task.id, {title: editedTitle, description: editedDescription});
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(task.id);
    };

    return (
        <div
            className={`relative rounded-lg shadow-md flex flex-col items-center justify-center text-center ${getCardGradient()} transition-all duration-500`}
            style={{
                width: isExpanded ? "24rem" : "12rem",
                height: isExpanded ? "24rem" : "12rem",
                zIndex: isExpanded ? 10 : 0,
                position: "relative",
            }}
            onClick={onToggleExpand} // Use the passed toggle function
        >
            <h3 className="text-lg font-semibold mb-2 text-white sm:text-xl md:text-2xl">{
                (isEditing ? <textarea value={editedTitle}
                                      onChange={(e) => {
                                          setEditedTitle(e.target.value)
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full border-b text-sm bg-transparent text-white border-white/50 sm:text-base md:text-lg"
                                      rows={2}
                /> : task.title )}</h3>
            <p className="text-2xl font-semibold mb-2 text-white sm:text-3xl md:text-4xl">
                {task.completed ? "Done" : new Date(task.due_date).toLocaleDateString() || "No Due Date"}
            </p>
            {isExpanded && (
                <div className="mt-2 max-h-40 overflow-auto text-sm text-white sm:max-h-60 md:max-h-80">
                    {isEditing ? (
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full border-b text-sm bg-transparent text-white border-white/50 sm:text-base md:text-lg"
                            rows={4}
                        />
                    ) : (
                        <p>{task.description || `Priority: ${task.priority}`}</p>
                    )}
                </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 w-full px-2 relative">
                <button
                    onClick={handleComplete}
                    className={`w-10 h-10 border-3 rounded-full hover:border-4  ${task.completed ? "border-green-100" : "border-white"} sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer transition-all duration-500`}
                >{task.completed ? <CheckIcon className="w-full h-full text-white"/> :
                    <XMarkIcon className="w-full h-full text-white"/>}</button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isEditing) handleSave(e);
                        else setIsEditing(true);
                    }}
                    className="text-sm px-2 py-1  text-white rounded hover:font-bold mt-2 sm:mt-0 sm:ml-2 md:text-base md:px-3 md:py-2 cursor-pointer"
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
                <button
                    onClick={handleDelete}
                    className="text-sm px-2 py-1 text-white rounded hover:font-bold mt-2 sm:mt-0 sm:ml-2 md:text-base md:px-3 md:py-2 cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}