import { configureStore } from '@reduxjs/toolkit';
import { Loaded } from '../Redux/Loaded';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    load: Loaded.reducer,
  },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getLoaded = (state: RootState) => state.load.Loaded;
export const getPercentage = (state: RootState) => state.load.percentage;
export default store;
