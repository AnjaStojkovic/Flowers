interface FlowerDetailsProps {
  description: string;
}
const FlowerInfo: React.FC<FlowerDetailsProps> = ({ description }) => {
  return (
    <div className="details-container">
      <div className="basic-info">
        <p>Kingdom:</p>
        <p>Order:</p>
        <p>Family:</p>
        <p>Species:</p>
      </div>
      <div className="flower-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FlowerInfo;
