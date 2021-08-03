import { Link } from "react-router-dom";
import StarIcon from "./StarIcon";
import { useState } from 'react';
import { IoStorefrontOutline, IoLocationSharp, IoHeartOutline, IoHeart, } from "react-icons/io5";








const StoreCard = ({ imgSrc, imgAlt, name, description, rating, i, isFavorite }) => {
  const finalImgAlt = imgAlt ?? name;

  const [storeSelected, setStoreSelected] = useState(null);
  const [favorite, setFavorite] = useState(isFavorite);

  return <div
    onMouseEnter={() => { setStoreSelected(`${name} - ${i}`) }}
    onMouseLeave={() => { setStoreSelected(null) }}
    className="p-4 bg-white relative max-w-[240px] rounded hover:shadow-2xl hover:-translate-y-3 transition duration-500"
  >

    {
      storeSelected == `${name} - ${i}` ?
        <div className="absolute p-6 flex h-full w-full bg-white bg-opacity-50 left-0 top-0 z-[9999999999999] animate__animated animate__fadeIn">
          <div className="m-auto flex bg-gray-300 w-full justify-between px-5 py-1 rounded animate__animated animate__fadeInUp animate__faster">
            <Link to={`/stores/nombre-de-tienda`}>
              <IoStorefrontOutline className="text-[40px] text-gray-600 hover:text-main cursor-pointer" />
            </Link>
            <IoLocationSharp className="text-[40px] text-gray-600 hover:text-main cursor-pointer" />
            {
              favorite ?
                <IoHeart onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[40px] text-main cursor-pointer" />
                :
                <IoHeartOutline onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[40px] text-gray-600 hover:text-main cursor-pointer" />
            }
          </div>
        </div>
        :
        null
    }

    {
      imgSrc ?
        <img
          src={`${process.env.REACT_APP_API_URL}/${imgSrc}`}
          alt={finalImgAlt}
          className="h-36 w-full mt-4 object-contain rounded-xl"
        />
        :
        <IoStorefrontOutline className="h-36 w-full mt-4 rounded-xl object-contain text-gray-400" />
    }

    <div className="space-y-2">

      <p className="font-bold text-center text-gray-600 text-xl hover:text-main">{name}</p>

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(n => <StarIcon
          key={n}
          className="w-4 h-4 text-yellow-400"
        />)}
      </div>
      <p className="opacity-75 text-xs text-center text-gray-800">{description}</p>

      <div className="text-center">
        <p className="font-bold text-gray-600 text-xl">desde: $4.99</p>
      </div>

      <div className="flex flex-wrap">
        {
          Array.from(Array(5).keys()).splice(1).map((n) => {
            return (
              <div key={n} className="bg-red-100 w-5/12 px-2 rounded-full text-main font-bold  mx-1 text-[9px] my-2">
                {n + '0% Descuento'}
              </div>
            )
          })
        }
      </div>
    </div>
  </div>;
};

export default StoreCard;