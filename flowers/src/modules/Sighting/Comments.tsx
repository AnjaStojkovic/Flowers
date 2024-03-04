import { useEffect, useState } from "react";
import OneComment from "./OneComment";
import CommentsService from "../../services/CommentsService";
import Input from "../../components/UserData/Input";
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addComment,
  fetchComments,
  setCurrentPage,
} from "../../store/comments-slice";

interface CommentsProps {
  created_at: Date;
  comments_count?: number;
  sightingId: number;
}

export interface FormData {
  content: string;
}

const Comments: React.FC<CommentsProps> = ({
  created_at,
  comments_count,
  sightingId,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const dispatch = useDispatch<any>();
  const { comments, loading, error, totalPages, currentPage } = useSelector(
    (state: RootState) => state.comments
  );
  useEffect(() => {
    dispatch(fetchComments(currentPage, sightingId));
  }, [dispatch, currentPage, sightingId]);

  const handleAddComment = (formData: FormData) => {
    dispatch(addComment(formData, sightingId));
  };

  const onSubmit = (data: FormData) => {
    try {
      handleAddComment(data);
      alert("Successfully added");
      reset({ content: "" });
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="comments">
      <hr className="comments__line" />
      <div className="comments__heading">
        <p className="comments__heading--number">{comments_count} comments</p>
        <button className="white-button">Add comment</button>
      </div>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <OneComment
            key={comment.id}
            id={comment.id}
            name={comment.user_full_name}
            content={comment.content}
            created_at={created_at}
            sightingId={sightingId}
          />
        ))
      ) : (
        <p>No comments</p>
      )}
      <Input
        type="textarea"
        placeholder="Write a comment..."
        register={register("content")}
        className="input-box"
        defaultValue=""
      />
      <div className="input-submit">
        <button className="red-button" onClick={handleSubmit(onSubmit)}>
          Publish Content
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Comments;
