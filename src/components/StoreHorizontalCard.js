import { Link } from "react-router-dom";
import Button from "./Button";
import StarIcon from "./StarIcon";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";


const StoreHorizontalCard = ({ imgSrc, imgAlt, name, description, rating, shortDescription, isFavorite }) => {

  const [favorite, setFavorite] = useState(isFavorite);

  return <div
    className="flex bg-white py-4 px-4 hover:shadow-2xl transition duration-300 rounded-md"
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-56 h-56 rounded-l-md"
    />

    <div className="flex-grow flex flex-col">
      <div className="flex justify-between">
        <div>
          <Link to={`/stores/nombre-de-tienda`}>
            <h4 className="text-lg font-semibold hover:text-main transition duration-300">{name}</h4>
          </Link>
          <p className="mt-4">{shortDescription}</p>
          <div className="flex space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map(n => <StarIcon
              key={n}
              className="w-5 h-5 text-yellow-400"
            />)}
          </div>
        </div>
        <div>
          {
            favorite ?
              <IoHeart onClick={() => {
                setFavorite((actualValue) => {
                  return !actualValue;
                })
              }} className="text-[30px] ml-auto text-main cursor-pointer" />
              :
              <IoHeartOutline onClick={() => {
                setFavorite((actualValue) => {
                  return !actualValue;
                })
              }} className="text-[30px] ml-auto text-gray-600 hover:text-main cursor-pointer" />
          }
          <p className="text-xl font-bold p-4">Desde: $36.99</p>

          <p className="text-gray-500 flex items-center">
            <IoLocationSharp className="text-lg mr-2"></IoLocationSharp> <span>A 5km de ti.</span>
          </p>
        </div>
      </div>
      <div className="text-gray-500">
        <p className="mb-4">Envios: Delivery, Envios largos.</p>
        <p>Productos: <span className="text-main">320</span></p>
      </div>
      <div className="flex my-4 items-center">
        <div className="flex w-1/2 flex-wrap">
          {
            Array.from(Array(5).keys()).splice(1).map((n) => {
              return (
                <div className="bg-red-100 px-2 rounded-full text-main font-bold  mx-1 text-[9px] my-2">
                  {n + '0% Descuento'}
                </div>
              )
            })
          }
        </div>
        <div className="flex justify-right w-1/2">

          <Link to={`/stores/nombre-de-tienda`} className="ml-auto text-gray-600 flex items-center hover:text-main">
            <IoStorefrontOutline className="text-[30px] mr-1" />
            <p>Ver tienda</p>
          </Link>

          <Link className="ml-4 flex items-center text-gray-600 hover:text-main">
            <IoLocationSharp className="text-[30px] mr-1" />
            <p>Ver en mapa</p>
          </Link>
        </div>
      </div>
    </div>
  </div>;
};

export default StoreHorizontalCard;