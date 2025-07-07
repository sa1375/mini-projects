import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { Product } from "../types/ProductInterface";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
// }

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) navigate("/login");
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, [navigate]);

  const total = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  const handleSubmit = () => {
    if (!address) return alert("لطفاً آدرس را وارد کنید.");
    // فرض بر ارسال به سرور...
    localStorage.removeItem("cart");
    setSubmitted(true);
    setTimeout(() => navigate("/products"), 3000);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        ثبت سفارش 🧾
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {submitted ? (
        <Alert severity="success">
          سفارش شما ثبت شد! در حال بازگشت به صفحه محصولات...
        </Alert>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            مجموع مبلغ: {total} تومان
          </Typography>
          <TextField
            fullWidth
            label="آدرس ارسال"
            multiline
            minRows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="success" onClick={handleSubmit}>
            ثبت نهایی سفارش
          </Button>
        </>
      )}
    </Box>
  );
};

export default Checkout;