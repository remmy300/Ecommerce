import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,
  items: [],
  orders: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItems = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItems) {
        existingItems.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
      state.totalQuantity += 1;
    },

    removeFromCart(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.totalAmount -=
          state.items[index].price * state.items[index].quantity;

        state.totalQuantity -= state.items[index].quantity;

        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      (state.items = []), (state.totalAmount = 0), (state.totalQuantity = 0);
    },

    finalizeOrder(state, action) {
      const newOrders = {
        id: new Date().toISOString(),
        items: state.items,
        totalAmount: state.totalAmount,
        ...action.payload,
      };
      state.orders.push(newOrders);
      state.items = 0;
      state.totalAmount = 0;
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, finalizeOrder } =
  CartSlice.actions;

export default CartSlice.reducer;
