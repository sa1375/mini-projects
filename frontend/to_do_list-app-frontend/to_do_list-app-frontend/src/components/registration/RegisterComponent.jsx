import React, {useReducer, useState} from "react";
import api from "../utils/api.js"
import axios from "axios";

// Initial state for the reducer
const initialState = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
    showPassword: false,
    showConfirmPassword: false,
};

// Reducer function to manage state updates
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return {...state, [action.field]: action.value};
        case "TOGGLE_PASSWORD":
            return {...state, showPassword: !state.showPassword};
        case "TOGGLE_CONFIRM_PASSWORD":
            return {...state, showConfirmPassword: !state.showConfirmPassword};
        case "SET_ERROR":
            return {...state, errorMessage: action.error};
        case "CLEAR_ERROR":
            return {...state, errorMessage: ""};
        case "RESET_FIELDS":
            return initialState;
        default:
            return state;
    }
};

function RegisterComponent({setCurrentPage}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        console.log("Submitting registration...");

        if (!state.username || !state.email || !state.password || !state.confirmPassword) {
            dispatch({type: "SET_ERROR", error: "All fields are required."});
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("http://localhost:8000/api/register/", {
                username: state.username,
                email: state.email,
                first_name: state.firstName,
                last_name: state.lastName,
                age: state.age,
                gender: state.gender,
                password: state.password,
            });

            dispatch({type: "RESET_FIELDS"});
            setCurrentPage("login");
        } catch (error) {

            dispatch({
                type: "SET_ERROR",
                error: error.response?.data?.error || "Registration failed. Please try again.",
            });
        }
        setLoading(false);
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-800 relative overflow-hidden">
            {/* Background Circles */}
            <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-30 top-10 left-10"></div>
            <div className="absolute w-56 h-56 bg-green-300 rounded-full opacity-30 bottom-10 right-10"></div>

            {/* Container */}
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg flex items-center">
                <div className="hidden md:block w-1/2 p-6">
                    <h2 className="text-4xl font-bold text-gray-700">Join Us Today!</h2>
                    <p className="text-gray-600 mt-4">Create your account and start managing your tasks efficiently.</p>
                </div>

                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Sign Up</h2>
                    {state.errorMessage &&
                        <p className="text-red-500 text-sm text-center mb-3">{state.errorMessage}</p>}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={state.firstName}
                        onChange={(event) => dispatch({
                            type: "SET_FIELD",
                            field: "firstName",
                            value: event.target.value
                        })}
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={state.lastName}
                        onChange={(event) => dispatch({
                            type: "SET_FIELD",
                            field: "lastName",
                            value: event.target.value
                        })}
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={state.age}
                        onChange={(event) => dispatch({type: "SET_FIELD", field: "age", value: event.target.value})}
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg"
                    />
                    <select
                        value={state.gender}
                        onChange={(event) => dispatch({type: "SET_FIELD", field: "gender", value: event.target.value})}
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg"
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Username"
                        value={state.username}
                        onChange={(event) =>
                            dispatch({type: "SET_FIELD", field: "username", value: event.target.value})
                        }
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={(event) =>
                            dispatch({type: "SET_FIELD", field: "email", value: event.target.value})
                        }
                        className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Password Field with Show/Hide Toggle */}
                    <div className="relative">
                        <input
                            type={state.showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={state.password}
                            onChange={(event) =>
                                dispatch({type: "SET_FIELD", field: "password", value: event.target.value})
                            }
                            className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
                            onClick={() => dispatch({type: "TOGGLE_PASSWORD"})}
                        >
                            {state.showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Confirm Password Field with Show/Hide Toggle */}
                    <div className="relative">
                        <input
                            type={state.showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={(event) =>
                                dispatch({type: "SET_FIELD", field: "confirmPassword", value: event.target.value})
                            }
                            className="w-full p-3 mb-4 bg-white text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
                            onClick={() => dispatch({type: "TOGGLE_CONFIRM_PASSWORD"})}
                        >
                            {state.showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button
                        onClick={handleRegister}
                        className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>

                    <button
                        onClick={() => setCurrentPage("login")}
                        className="w-full mt-4 py-3 text-blue-600 font-medium bg-transparent border border-blue-400 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;

