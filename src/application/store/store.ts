import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: messagesReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch