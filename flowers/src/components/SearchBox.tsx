import { useForm } from "react-hook-form";
import searchIcon from "../assets/images/search.svg";

interface SearchFormInput {
  searchTerm: string;
}

interface SearchBoxProps {
  onSearchSubmit: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchSubmit }) => {
  const { register, handleSubmit } = useForm<SearchFormInput>();

  const onSubmit = (data: SearchFormInput) => {
    onSearchSubmit(data.searchTerm);
  };

  return (
    <form className="searchBox" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Looking for something specific?"
        {...register("searchTerm")}
      />
      <button className="searchButton" type="submit">
        <img src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};

export default SearchBox;
