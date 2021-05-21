import { Link } from "react-router-dom";
import Button from "./Button";
import StarIcon from "./StarIcon";

const StoreHorizontalCard = ({imgSrc, imgAlt, name, description, rating}) => {
  return <Link
    to={`/products/slug-del-producto`}
    className="flex bg-white shadow hover:shadow-lg rounded-md"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-56 h-56 rounded-l-md"
    />

    <div className="flex-grow p-4 flex flex-col">
      <h4 className="text-2xl font-semibold">{name}</h4>
      <div className="flex space-x-1 mt-2">
        {[1, 2, 3, 4, 5].map(n => <StarIcon
          key={n}
          className="w-5 h-5 text-yellow-400"
        />)}
      </div>
      <p className="mt-4">{description}</p>

      <div className="text-right mt-auto">
        <Button color="main">Ir a la tienda</Button>
      </div>
    </div>
  </Link>;
};

export default StoreHorizontalCard;