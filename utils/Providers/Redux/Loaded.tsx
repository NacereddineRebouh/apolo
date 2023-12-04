import { createSlice } from '@reduxjs/toolkit';

export const Loaded = createSlice({
  name: 'Loaded',
  initialState: {
    Loaded: false,
    percentage: 0,
  },
  reducers: {
    setLoaded: (state) => {
      state.Loaded = true;
    },
    setLoading: (state) => {
      state.Loaded = false;
    },
    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },
  },
});

export const { setLoaded, setLoading, setPercentage } = Loaded.actions;
export default Loaded.reducer;
