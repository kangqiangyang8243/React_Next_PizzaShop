import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    NumOfItems: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.products = [...state.products, action.payload];
      state.NumOfItems += Number(action.payload.NumOfItems);
      state.total += action.payload.price * Number(action.payload.NumOfItems);
      toast.success("Item Added to cart");
    },

    removeFromCart: (state, action) => {
      const index = state.products.findIndex(
        (basketItem) => basketItem._id === action.payload._id
      );

      let tempProducts = [...state.products];
      let tempNumOfItems = state.NumOfItems;
      let tempTotal = state.total;

      if (index >= 0) {
        tempNumOfItems -= Number(tempProducts[index]?.NumOfItems);
        tempTotal -=
          tempProducts[index]?.price * Number(tempProducts[index]?.NumOfItems);
        tempProducts.splice(index, 1);
        // toast.success("Item removed from cart");
        toast.info("Item removed from cart");
      }

      state.products = tempProducts;
      state.NumOfItems = tempNumOfItems;
      state.total = tempTotal;
    },
    resetCart: (state) => {
      state.products = [];
      state.NumOfItems = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
