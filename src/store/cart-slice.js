import { createSlice } from "@reduxjs/toolkit";

const defaultCart = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCart,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }
    },

    removeFromCart(state, action) {
      const itemID = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === itemID);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemID);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
