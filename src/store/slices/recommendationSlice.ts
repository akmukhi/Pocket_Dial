import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recommendation {
  id: string;
  name: string;
  brand: string;
  price: string;
}

interface RecommendationState {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationState = {
  recommendations: [],
  loading: false,
  error: null,
};

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRecommendations, setLoading, setError } = recommendationSlice.actions;
export default recommendationSlice.reducer; 