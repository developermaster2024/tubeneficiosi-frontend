import { Link } from "react-router-dom";
import Button from "./Button"

const ProductCard = ({
  name,
  slug,
  description,
  // rating,
  price,
  quantity,
  imgSrc,
  imgAlt,
  onBuy,
  buttonText
}) => {

  return <div
    className="p-5 mt-12 max-w-[250px] space-y-4 relative pt-28 w-full rounded-md transform hover:shadow-2xl hover:-translate-y-3 transition duration-500"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-9/12 -top-12 left-1/2 transform -translate-x-1/2  absolute h-36 rounded-md"
    />

    <div className="space-y-2">

      <Link
        to={`/products/${slug}`}
        title={name}
      >
        <p className="font-bold text-center text-gray-600 text-lg hover:text-main">{name.length > 35 ? `${name.slice(0, 35)}...` : name}</p>
      </Link>

      <div className="flex space-x-1 justify-center">
        {[1, 2, 3, 4, 5].map(n => <svg
          key={n}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-300"
          fill={n === 5 ? 'none' : 'currentColor'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>)}
      </div>

      <p className="opacity-75 text-xs text-center text-gray-800 truncate">{description}</p>

      <div className="text-center">
        <p className="font-bold text-gray-600 text-xl">{price > 0 ? `$${price}` : "Gratis"}</p>
      </div>
    </div>

    {
      quantity > 0 ?
        <div className="flex items-center w-full justify-between space-x-1">
          <div className="flex justify-around w-1/3 items-center text-lg">
            <p className="text-bold text-gray-800 text-lg cursor-pointer hover:text-main">-</p>
            <p>1</p>
            <p className="text-bold text-gray-800 text-lg cursor-pointer hover:text-main">+</p>
          </div>
          <Button className="w-2/3 rounded-lg" color="main" onClick={onBuy}>{buttonText ? buttonText : "Comprar"}</Button>
        </div>
        :
        <div className="text-center text-red-500 text-xl">
          No Disponible
        </div>
    }
  </div>
};

export default ProductCard;