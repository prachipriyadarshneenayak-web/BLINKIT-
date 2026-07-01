import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: JSON.parse(
    localStorage.getItem("wishlistItems")
  ) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const exist = state.wishlistItems.find(
        (x) => x._id === action.payload._id
      );

      if (!exist) {
        state.wishlistItems.push(action.payload);
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems =
        state.wishlistItems.filter(
          (item) => item._id !== action.payload
        );

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;