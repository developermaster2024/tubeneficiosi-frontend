import { Link } from "react-router-dom";
import Button from "./Button";
import ProductFeature from "./ProductFeature";
import StarIcon from "./StarIcon";

const ProductHorizontalCard = ({
  imgSrc,
  imgAlt,
  name,
  description,
  price,
  // rating,
}) => {
  return <Link
    to={`/products/slug-del-producto`}
    className="flex bg-white shadow hover:shadow-lg rounded-md"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-56 h-56 rounded-l-md"
    />
    <div className="flex-grow p-4">
      <h4 className="text-xl font-semibold mb-1">{name}</h4>
      <span className="block mb-1">{description}</span>
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map(n => <StarIcon
          key={n}
          className="h-5 w-5"
          fill={n === 5 ? 'none' : 'currentColor'}
        />)}
      </div>

      <div className="space-y-2">
        <ProductFeature
          className="w-full"
          name="Fresheness"
          value="New (Extra fresh)"
        />
        
        <ProductFeature
          className="w-full"
          name="Farm"
          value="Grocery Tarm Fields"
        />

        <ProductFeature
          className="w-full"
          name="Delivery"
          value="Europe"
        />

        <ProductFeature
          className="w-full"
          name="Stock"
          value={<span className="text-main">320 pcs</span>}
        />
      </div>
    </div>
    <div className="w-64 flex flex-col p-4 space-y-4">
      <div>
        <p className="font-semibold text-xl">{price} USD</p>
        <span className="text-xs text-gray-600 line-through">48.56</span>
      </div>

      <div>
        <p className="text-gray-600 font-semibold">Envío gratis</p>
        <p className="text-gray-600 opacity-75">Entrega en un dia</p>
      </div>

      <Button color="main" onClick={e => e.preventDefault()}>Comprar ahora</Button>
    </div>
  </Link>;
};

export default ProductHorizontalCard;