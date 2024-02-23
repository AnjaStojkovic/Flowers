import { useEffect, useState } from "react";
import OneComment from "./OneComment";
import CommentsService from "../../services/CommentsService";
import { useParams } from "react-router-dom";
import Input from "../../components/UserData/Input";
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination";

interface CommentsProps {
  created_at: Date;
  comments_count?: number;
}

interface Comment {
  id: number;
  user_full_name: string;
  sightings: number;
  content: string;
}

export interface FormData {
  content: string;
}

const Comments: React.FC<CommentsProps> = ({ created_at, comments_count }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { sightingId } = useParams();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const getCommentsData = async (sightingId: any) => {
    try {
      const response = await CommentsService.getComments(
        currentPage,
        sightingId
      );
      const { comments } = response;
      setComments(comments);
      setCurrentPage(response.meta.pagination.current_page);
      setTotalPages(response.meta.pagination.total_pages);
    } catch (error) {
      console.error("An error occurred while fetching comments:", error);
      setComments([]);
    }
  };

  useEffect(() => {
    getCommentsData(sightingId);
  }, [currentPage]);

  const onSubmit = async (data: FormData) => {
    create(data);
  };

  const create = (formData: FormData) => {
    CommentsService.postComment(formData, sightingId)
      .then(() => {
        alert("Successfully added");
        reset({ content: "" });
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="comments">
      <hr className="comments__line" />
      <div className="comments__heading">
        <p className="comments__heading--number">{comments_count} comments</p>
        <button className="white-button">Add comment</button>
      </div>
      {comments &&
        comments.map((comment) => (
          <OneComment
            name={comment.user_full_name}
            sightings={comment.sightings}
            content={comment.content}
            created_at={created_at}
          />
        ))}
      <Input
        type="text"
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
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default Comments;
