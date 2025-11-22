import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../types/ProductInterface";
import type { Dispatch, SetStateAction } from "react";


// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
// }

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  products,
  setProducts,
}) => {
  const removeItem = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const total = products.reduce((a, c) => a + c.price, 0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>🛒 سبد خرید</DialogTitle>
      <DialogContent dividers>
        {products.length === 0 ? (
          <Typography>سبد خرید خالی است.</Typography>
        ) : (
          <List>
            {products.map((item) => (
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
        )}
      </DialogContent>
      <DialogActions>
        <Typography sx={{ flexGrow: 1, pl: 2 }}>
          مجموع: {total} تومان
        </Typography>
        <Button onClick={onClose}>بستن</Button>
      </DialogActions>
    </Dialog>
  );
};
export default CartModal;
