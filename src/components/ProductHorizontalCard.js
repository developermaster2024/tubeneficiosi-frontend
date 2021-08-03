import { Link } from "react-router-dom";
import Button from "./Button";
import ProductFeature from "./ProductFeature";
import StarIcon from "./StarIcon";
import { IoChevronForwardSharp } from "react-icons/io5";

const ProductHorizontalCard = ({
  imgSrc,
  imgAlt,
  name,
  slug,
  description,
  price,
  // rating,
  onBuy,
  storeName,
  storeImageSrc,
  storeImageAlt,
  deliveryMethodTypes,
}) => {
  return <div
    className="flex bg-white border hover:shadow-2xl transform transition duration-500 hover:-translate-y-2 rounded-md p-4 animate__animated animate__rotateInUpLeft"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-56 h-56 rounded-xl"
    />
    <div className="flex-grow p-4">
      <Link className="hover:text-main" to={`/products/${slug}`}>
        <h4 className="text-lg font-semibold mb-1">{name}</h4>
      </Link>
      <span className="block text-gray-500 mb-1">{description}</span>
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map(n => <StarIcon
          key={n}
          className="h-5 w-5 text-yellow-300"
          fill={n === 5 ? 'none' : 'currentColor'}
        />)}
      </div>

      <div className="space-y-2">
        <ProductFeature
          className="w-full"
          name="Tienda"
          value={
            <Link className="text-blue-500 hover:text-main" to={'stores/burguerking'}>
              <div className="flex items-center">
                <img className="w-8 h-8" src={storeImageSrc} alt={storeImageAlt} />
                <p className="ml-2">{storeName}</p>
              </div>
            </Link>
          }
        />

        <ProductFeature
          className="w-full"
          name="Envíos"
          value={deliveryMethodTypes.join(', ')}
        />

        <ProductFeature
          className="w-full"
          name="Cantidad"
          value={<span className="text-main">320 pcs</span>}
        />
      </div>
    </div>
    <div className="w-64 flex-shrink-0 flex flex-col p-4 space-y-4">
      <div>
        <p className="font-semibold text-xl">{price} USD</p>
        <span className="text-xs text-gray-600 line-through">48.56</span>
      </div>

      <div>
        <p className="text-gray-600 font-semibold">Envío gratis</p>
        <p className="text-gray-600 opacity-75">Entrega en un dia</p>
      </div>

      <button className="bg-main rounded-2xl p-4 text-white flex justify-between items-center font-bold text-md hover:bg-gray-100 transition duration-500 hover:text-main hover:shadow-xl" onClick={onBuy}>
        Comprar ahora
        <IoChevronForwardSharp className="text-xl" />
      </button>
    </div>
  </div >;
};

export default ProductHorizontalCard;