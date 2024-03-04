import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LikesService from "../services/LikesService";

interface likeType {
  id: string;
  liked: boolean;
}

interface LikeState {
  pending: "loading" | "succeded" | "failed" | "idle";
  likes: likeType[];
}

const initialState: LikeState = {
  pending: "idle",
  likes: [],
};

export const postLike = createAsyncThunk(
  "POST_LIKE",
  async (sightingId: number, { rejectWithValue }) => {
    try {
      const response = await LikesService.postLike(sightingId);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "DELETE_LIKE",
  async (sightingId: number, { rejectWithValue }) => {
    try {
      const response = await LikesService.deleteLike(sightingId);

      return response;
    } catch (error) {
      rejectWithValue(error);
      alert("An error occurred while deleting the like");
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLike.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(postLike.fulfilled, (state, action) => {
        state.pending = "succeded";
        state.likes = [
          ...state.likes,
          { id: action?.payload?.like?.id, liked: true },
        ];
      })
      .addCase(postLike.rejected, (state, action) => {
        state.pending = "failed";
        console.log("ERROR: ", action.payload);
      })

      .addCase(deleteLike.pending, (state) => {
        state.pending = "loading";
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.pending = "succeded";
        state.likes = [
          ...state.likes,
          { id: action?.payload?.like?.id, liked: false },
        ];
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.pending = "failed";
        console.log("ERROR: ", action.payload);
      });
  },
});

export default likeSlice.reducer;
