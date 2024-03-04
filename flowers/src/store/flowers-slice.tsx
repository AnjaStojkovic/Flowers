import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import FlowersService from "../services/FlowersService";

interface Flower {
  flower: any;
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  features: string[];
  description: string;
}

interface FavoriteData {
  id: number;
  flower: Flower;
}

interface FlowerState {
  flowers: Flower[];
  favorites: FavoriteData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  currentFlower: Flower | null;
}

const initialState: FlowerState = {
  flowers: [],
  favorites: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
  currentFlower: null,
};

const flowerSlice = createSlice({
  name: "flower",
  initialState,
  reducers: {
    fetchFlowersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFlowersSuccess(state, action: PayloadAction<Flower[]>) {
      state.loading = false;
      state.flowers = action.payload;
    },
    fetchFlowersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFavoriteFlowersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteFlowersSuccess(state, action: PayloadAction<FavoriteData[]>) {
      state.loading = false;
      state.favorites = action.payload;
    },
    fetchFavoriteFlowersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSearchedFlowersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSearchedFlowersSuccess(state, action: PayloadAction<Flower[]>) {
      state.loading = false;
      state.flowers = action.payload;
    },
    fetchSearchedFlowersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOneFlowerStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOneFlowerSuccess(state, action: PayloadAction<Flower>) {
      state.loading = false;
      state.currentFlower = action.payload;
    },
    fetchOneFlowerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addFlowerStart(state) {
      state.loading = true;
      state.error = null;
    },
    addFlowerSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      const flowerIdToAdd = action.payload;
      const flowerToAdd = state.favorites.find(
        (flower) => flower.id === flowerIdToAdd
      );
      const isExistingFlower = state.favorites.some(
        (flower) => flower.id === flowerIdToAdd
      );
      if (flowerToAdd && !isExistingFlower) {
        state.favorites.push(flowerToAdd);
      }
    },
    addFlowerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteFlowerStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFlowerSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.flowers = state.flowers.filter(
        (flower) => flower.id !== action.payload
      );
    },
    deleteFlowerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchFlowersStart,
  fetchFlowersSuccess,
  fetchFlowersFailure,
  fetchFavoriteFlowersStart,
  fetchFavoriteFlowersSuccess,
  fetchFavoriteFlowersFailure,
  fetchSearchedFlowersStart,
  fetchSearchedFlowersSuccess,
  fetchSearchedFlowersFailure,
  fetchOneFlowerStart,
  fetchOneFlowerSuccess,
  fetchOneFlowerFailure,
  addFlowerStart,
  addFlowerSuccess,
  addFlowerFailure,
  deleteFlowerStart,
  deleteFlowerSuccess,
  deleteFlowerFailure,
  setTotalPages,
  setCurrentPage,
} = flowerSlice.actions;

export default flowerSlice.reducer;

export const fetchFlowers =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchFlowersStart());
      const response = await FlowersService.getFlowers(page);
      const { flowers, meta } = response;
      dispatch(setTotalPages(meta.pagination.total_pages));
      dispatch(setCurrentPage(meta.pagination.current_page));
      dispatch(fetchFlowersSuccess(flowers));
    } catch (error: any) {
      dispatch(fetchFlowersFailure(error.message));
    }
  };

export const fetchOneFlower =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchOneFlowerStart());
      const response = await FlowersService.getOneFlower(id);
      dispatch(fetchOneFlowerSuccess(response?.flower));
    } catch (error: any) {
      dispatch(fetchFlowersFailure(error.message));
    }
  };

export const getFavoriteFlowers =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchFavoriteFlowersStart());
      const response = await FlowersService.getFavorites(page);
      const { fav_flowers, meta } = response;
      dispatch(setTotalPages(meta.pagination.total_pages));
      dispatch(setCurrentPage(meta.pagination.current_page));
      dispatch(fetchFavoriteFlowersSuccess(fav_flowers));
    } catch (error: any) {
      dispatch(fetchFavoriteFlowersFailure(error.message));
    }
  };

export const getSearchedFlowers =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchSearchedFlowersStart());
      const response = await FlowersService.getSearchedFlowers(name);
      const { flowers, meta } = response;
      dispatch(setTotalPages(meta.pagination.total_pages));
      dispatch(setCurrentPage(meta.pagination.current_page));
      dispatch(fetchSearchedFlowersSuccess(flowers));
    } catch (error: any) {
      dispatch(fetchFavoriteFlowersFailure(error.message));
    }
  };

export const addFavoriteFlower =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addFlowerStart());
      const newFlower = await FlowersService.postFavoriteFlower(id);
      dispatch(addFlowerSuccess(newFlower));
    } catch (error: any) {
      dispatch(addFlowerFailure(error.message));
    }
  };

export const deleteFavoriteFlower =
  (flowerId: any, id: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteFlowerStart());
      await FlowersService.deleteFavoriteFlower(flowerId, id);
      dispatch(deleteFlowerSuccess(id));
    } catch (error: any) {
      dispatch(deleteFlowerFailure(error.message));
    }
  };
