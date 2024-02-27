import dayjs from "dayjs";
import flower from "../../assets/images/flower.jpg";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentsService from "../../services/CommentsService";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

interface CommentProps {
  id: number;
  name: string;
  sightings: number;
  content: string;
  created_at: Date;
  sightingId: number;
}

const OneComment: React.FC<CommentProps> = ({
  id,
  name,
  sightings,
  content,
  created_at,
  sightingId,
}) => {
  const formattedTimeAgo = dayjs(created_at).fromNow();
  const handleRemoveComment = async (sightingId: number, id: number) => {
    try {
      await CommentsService.deleteComment(sightingId, id);
      alert("Comment removed");
      window.location.reload();
    } catch (error) {
      alert("An error occured while removing comment");
    }
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
          onClick={() => handleRemoveComment(sightingId, id)}
        >
          Delete comment
        </button>
      </div>
      <hr className="left__line" />
    </div>
  );
};

export default OneComment;
