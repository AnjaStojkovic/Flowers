import img from "../../assets/images/flowerLogo.svg";
import Card from "./Card";

interface Image {
    id: number;
    name: string;
    description: string;
    sightings: number;
}

interface ImagesListProps {
    images: Image[]; 
}

const imgg = {
    id: 1,
    name: "name1",
    description: "descr1",
    sightings: 5

}

const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
    return (
        <div className="imagesList">
            {images.map((image) => (
                <Card
                    key={image.id} 
                    name={image.name}
                    description={image.description}
                    sightings={image.sightings}
                />
            ))} 
            
        </div>
    );
}

export default ImagesList;