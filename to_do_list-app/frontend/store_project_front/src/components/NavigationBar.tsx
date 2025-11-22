import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";


const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}
          sx={{ mr: 2 }}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          فروشگاه آنلاین
        </Typography>
        {token && (
          <>
            <IconButton color="inherit" onClick={() => navigate("/cart")}>  
              <ShoppingCartCheckoutIcon />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              خروج
            </Button>
          </>
        )}
        {!token && (
          <Button color="inherit" onClick={() => navigate("/login")}>ورود</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavigationBar;
