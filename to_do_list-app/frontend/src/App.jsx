import React, {useState} from 'react';
import LoginComponent from './components/login/LoginComponent';
import RegisterComponent from "./components/registration/RegisterComponent.jsx";
import DashboardComponent from './components/dashboard/DashboardComponent';
import {UserProvider} from "./components/context/UserContext.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    return (
        <UserProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {currentPage === 'login' && <LoginComponent setCurrentPage={setCurrentPage}/>}
                {currentPage === 'dashboard' && <DashboardComponent setCurrentPage={setCurrentPage}/>}
                {currentPage === 'register' && <RegisterComponent setCurrentPage={setCurrentPage}/>}
            </LocalizationProvider>
        </UserProvider>
    );
}

export default App;
