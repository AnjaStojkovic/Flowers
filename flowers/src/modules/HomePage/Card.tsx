interface CardProps {
    name: string;
    description: string;
    sightings: number;
}

const Card: React.FC<CardProps> = ({ name, description, sightings }) => {
    return (
         <div className="card">
             <img />
             <h1>{name}</h1>
             <p>{description}</p>
             <p>Sightings: {sightings}</p>
         </div>
    );
}

export default Card;