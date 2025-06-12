import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Watch {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string;
}

interface WatchState {
  watches: Watch[];
  loading: boolean;
  error: string | null;
}

const initialState: WatchState = {
  watches: [],
  loading: false,
  error: null,
};

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    setWatches: (state, action: PayloadAction<Watch[]>) => {
      state.watches = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setWatches, setLoading, setError } = watchSlice.actions;
export default watchSlice.reducer; 