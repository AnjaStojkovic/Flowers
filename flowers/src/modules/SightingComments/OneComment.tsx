import dayjs from "dayjs";
import flower from "../../assets/images/flower.jpg";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CommentProps {
  name: string;
  sightings: number;
  content: string;
  created_at: Date;
}

const OneComment: React.FC<CommentProps> = ({
  name,
  sightings,
  content,
  created_at,
}) => {
  const formattedTimeAgo = dayjs(created_at).fromNow();

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
      <hr className="left__line" />
    </div>
  );
};

export default OneComment;
