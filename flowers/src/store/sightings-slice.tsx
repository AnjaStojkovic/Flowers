import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import SightingsService from "../services/SightingsService";

interface User {
  id: number;
  full_name: string;
}

interface Flower {
  id: number;
}

interface Sighting {
  name: string;
  id: number;
  full_name: string;
  user: User;
  description: string;
  picture: string;
  likes_count: number;
  comments_count: number;
  created_at: Date;
  flower: Flower;
}

interface SightingState {
  sightings: Sighting[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  currentSighting: Sighting | null;
}

const initialState: SightingState = {
  sightings: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
  currentSighting: null,
};

const sightingsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchSightingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSightingsSuccess(state, action: PayloadAction<Sighting[]>) {
      state.loading = false;
      state.sightings = action.payload;
    },
    fetchSightingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOneSightingStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOneSightingSuccess(state, action: PayloadAction<Sighting>) {
      state.loading = false;
      state.currentSighting = action.payload;
    },
    fetchOneSightingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSigthingStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSightingSuccess(state, action: PayloadAction<Sighting>) {
      state.loading = false;
      state.sightings.push(action.payload);
    },
    addSightingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSightingStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSightingSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.sightings = state.sightings.filter(
        (sighting) => sighting.id !== action.payload
      );
    },
    deleteSightingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentSighting(state, action: PayloadAction<Sighting | null>) {
      state.currentSighting = action.payload;
    },
  },
});

export const {
  fetchSightingsStart,
  fetchSightingsSuccess,
  fetchSightingsFailure,
  fetchOneSightingStart,
  fetchOneSightingSuccess,
  fetchOneSightingFailure,
  addSigthingStart,
  addSightingSuccess,
  addSightingFailure,
  deleteSightingStart,
  deleteSightingSuccess,
  deleteSightingFailure,
  setCurrentPage,
  setTotalPages,
  setCurrentSighting,
} = sightingsSlice.actions;

export default sightingsSlice.reducer;

export const fetchSightings =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchSightingsStart());
      const response = await SightingsService.getSightings(page);
      const { sightings, meta } = response;
      dispatch(setTotalPages(meta.pagination.total_pages));
      dispatch(setCurrentPage(meta.pagination.current_page));
      dispatch(fetchSightingsSuccess(sightings));
    } catch (error: any) {
      dispatch(fetchSightingsFailure(error.message));
    }
  };

export const fetchOneSighting =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchOneSightingStart());
      const response = await SightingsService.getOneSighting(id);
      dispatch(fetchOneSightingSuccess(response?.sighting));
    } catch (error: any) {
      dispatch(fetchOneSightingFailure(error.message));
    }
  };

export const addSighting =
  (formData: FormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addSigthingStart());
      const newSighting = await SightingsService.postSighting(formData);
      dispatch(addSightingSuccess(newSighting));
    } catch (error: any) {
      dispatch(addSightingFailure(error.message));
    }
  };

export const deleteSighting =
  (sightingId: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteSightingStart());
      await SightingsService.deleteSighting(sightingId);
      dispatch(deleteSightingSuccess(sightingId));
    } catch (error: any) {
      dispatch(deleteSightingFailure(error.message));
    }
  };
