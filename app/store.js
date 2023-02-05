import cartReducer from "@/slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
