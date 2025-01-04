import { configureStore } from '@reduxjs/toolkit';
import paneReducer from './slices/paneSlice';

export const store = configureStore({
    reducer: {
        panes: paneReducer
    }
});