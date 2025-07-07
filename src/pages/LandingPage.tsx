import React from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          فروشگاه ما
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          خوش اومدی! برای دیدن محصولات و خرید، وارد حساب کاربری‌ات شو.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          ورود به حساب کاربری
        </Button>
      </Container>
    </Box>
  );
};

export default LandingPage;
