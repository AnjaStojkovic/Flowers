import dayjs from "dayjs";
import flower from "../../assets/images/flower.jpg";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentsService from "../../services/CommentsService";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/comments-slice";

dayjs.extend(relativeTime);

interface CommentProps {
  id: number;
  name: string;
  content: string;
  created_at: Date;
  sightingId: number;
}

const OneComment: React.FC<CommentProps> = ({
  id,
  name,
  content,
  created_at,
  sightingId,
}) => {
  const formattedTimeAgo = dayjs(created_at).fromNow();
  const dispatch = useDispatch<any>();

  const handleDeleteComment = (sightingId: number, id: number) => {
    dispatch(deleteComment(sightingId, id));
  };

  return (
    <div className="left">
      <div className="left__user-box2">
        <img className="left__user-box2__profile-pic" src={flower} />
        <div className="left__user-box2__user">
          <p className="left__user-box2__user--name">{name}</p>
          <p className="left__user-box2__user--username">{formattedTimeAgo}</p>
        </div>
      </div>
      <p className="left__text">{content}</p>
      <div className="delete-comment">
        <button
          className="red-button"
          onClick={() => handleDeleteComment(sightingId, id)}
        >
          Delete comment
        </button>
      </div>
      <hr className="left__line" />
    </div>
  );
};

export default OneComment;
