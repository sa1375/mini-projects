import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import api from "../api/axios";
import CartModal from "../components/CartModal";

import type { Product } from "../types/ProductInterface";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
// }

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  useEffect(() => {
    api
      .get("products/")
      .then((res) => {
        setProducts(res.data.results) ; 
       } )
      .catch(() => alert("خطا در دریافت محصولات"))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;

  return (
    <>
      <IconButton
        onClick={() => setCartOpen(true)}
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <ShoppingCartCheckoutIcon />
      </IconButton>
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        products={cartItems}
        setProducts={setCartItems as React.Dispatch<React.SetStateAction<Product[]>>}
      />
      <Grid container spacing={3} sx={{ p: 4 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="green">
                  {product.price} تومان
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                >
                  افزودن به سبد
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ProductList;
