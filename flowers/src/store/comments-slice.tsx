import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import CommentsService from "../services/CommentsService";
import { FormData } from "../modules/Sighting/Comments";

interface Comment {
  id: number;
  user_id: number;
  user_full_name: string;
  sighting_id: number;
  content: string;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
};

const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentStart(state) {
      state.loading = true;
      state.error = null;
    },
    addCommentSuccess(state, action: PayloadAction<Comment>) {
      state.loading = false;
      state.comments.push(action.payload);
    },
    addCommentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    deleteCommentFailure(state, action: PayloadAction<string>) {
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
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  setTotalPages,
  setCurrentPage,
} = commentsSlice.actions;

export default commentsSlice.reducer;

export const fetchComments =
  (page: number, sightingId: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchCommentsStart());
      const response = await CommentsService.getComments(page, sightingId);
      const { comments, meta } = response;
      dispatch(setTotalPages(meta.pagination.total_pages));
      dispatch(setCurrentPage(meta.pagination.current_page));
      dispatch(fetchCommentsSuccess(comments));
    } catch (error: any) {
      dispatch(fetchCommentsFailure(error.message));
    }
  };

export const addComment =
  (formData: FormData, sightingId: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addCommentStart());
      const newComment = await CommentsService.postComment(
        formData,
        sightingId
      );
      dispatch(addCommentSuccess(newComment));
    } catch (error: any) {
      dispatch(addCommentFailure(error.message));
    }
  };

export const deleteComment =
  (sightingId: number, id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteCommentStart());
      await CommentsService.deleteComment(sightingId, id);
      dispatch(deleteCommentSuccess(id));
    } catch (error: any) {
      dispatch(deleteCommentFailure(error.message));
    }
  };
