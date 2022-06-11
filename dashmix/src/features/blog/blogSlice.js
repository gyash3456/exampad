import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    categories: null,
    loading: false,
    errorVal: true,
  },
  reducers: {
    categoriesRequest: () => {},
    categoriesPending: () => ({ categories: null, loading: true }),
    categoriesSuccess: (state, { payload: categories }) => ({
      categories,
      loading: false,
    }),
    categoriesFailure: () => ({ categories: null, loading: false, errorVal: true }),
  },
});

export const actions = blogSlice.actions;
export default blogSlice.reducer;
