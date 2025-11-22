import  React,{ useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../types/ProductInterface";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
// }

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🛒 سبد خرید
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>سبد خرید شما خالی است.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <div key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => removeItem(item.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.price} تومان`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            مجموع: {total} تومان
          </Typography>
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            ثبت سفارش
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
