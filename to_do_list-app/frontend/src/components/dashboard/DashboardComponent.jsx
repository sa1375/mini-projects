import {useState} from "react";
import {Bars3Icon, UsersIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import SearchBar from "../UI/SearchBar.jsx";
import Dashboard from "./Dashboard.jsx"; // ✅ Split-screen icon
import TaskContainer from "../tasks/TasksContainer.jsx" ;
import Profile from "./Profile.jsx"


function DashboardComponent() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");

    const handleLogout = () => {
        localStorage.removeItem("access_token"); // ✅ Clears session
        localStorage.removeItem('isLoggedIn');
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="flex min-h-screen overflow-auto">
            {/* Sidebar */}
            <div
                className={`bg-gradient-to-br from-purple-900 to-indigo-800 text-white fixed top-0 left-0 h-full w-64 transform transition-transform duration-250 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                }`}
            >
                <ul className="mt-24 space-y-4">
                    <li
                        className={`p-3 hover:text-xl hover:font-bold cursor-pointer 
                                    ${activePage === "dashboard" ? "text-xl font-bold" : ""}`}
                        onClick={() => {
                            setActivePage('dashboard');
                        }}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`p-3 hover:text-xl hover:font-bold cursor-pointer ${
                            activePage === "tasks" ? "text-xl font-bold" : ""}`}
                        onClick={() => {
                            setActivePage('TasksContainer');
                        }}
                    >
                        Tasks
                    </li>
                </ul>
            </div>

            {/* Navbar */}
            <nav className="w-full bg-white p-4 flex items-center justify-between shadow-md fixed top-0 left-0 z-10">
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-all"
                >
                    <Bars3Icon className="h-8 w-8 text-blue-700"/>
                </button>

                {/* User Profile Section */}
                <div className="flex items-center space-x-4">
                    <SearchBar />
                    <UsersIcon className="mr-8 h-9 w-9 text-blue-700 cursor-pointer"
                               onClick={() => setActivePage("profile")}/>
                    <ArrowLeftStartOnRectangleIcon onClick={handleLogout}
                                                   className='h-9 w-9 text-red-700 cursor-pointer'/>
                </div>
            </nav>

            {/* Main Content (Moves with Sidebar) */
            }
            <div
                className={`flex-1 p-6 bg-gray-100 transition-all duration-300 mt-20 ${
                    isSidebarOpen ? "pl-72" : "pl-20"
                }`}
            >
                {activePage === "dashboard" && <Dashboard setActivePage={setActivePage}/>}
                {activePage === "profile" && <Profile setActivePage={setActivePage}/>}
                {activePage === "TasksContainer" && <TaskContainer setActivePage={setActivePage}/>}
            </div>
        </div>
    )
        ;
}

export default DashboardComponent;