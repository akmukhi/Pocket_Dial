import { configureStore } from '@reduxjs/toolkit';
import watchReducer from './slices/watchSlice';
import userReducer from './slices/userSlice';
import recommendationReducer from './slices/recommendationSlice';

// Import reducers here
// const rootReducer = combineReducers({
//   // Add reducers here
// });

const store = configureStore({
  reducer: {
    watch: watchReducer,
    user: userReducer,
    recommendation: recommendationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 