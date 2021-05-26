import { Link } from "react-router-dom";

const StoreDiscountCard = ({ storeDiscount }) => {

  return <div
    className="bg-white flex align-center p-3 rounded-lg"
  >
    <div className="w-3/12 text-center p-1 border-r border-gray">
      <img className="m-auto w-1/2 text-center" src={storeDiscount.store.img} alt={storeDiscount.store.name} />
      <p className="text-gray-700 font-semibold text-center break-words">
        {storeDiscount.store.name}
      </p>
    </div>
    <div className="w-2/3 text-right">
      <div className="text-main">
        <p className="text-4xl text-bold">
          {storeDiscount.discount}
        </p>
        <p className="text-xs">Descuento</p>
      </div>
      <div className="mt-2">
        <Link to={storeDiscount.link}>
          <button className="mt-2 bg-red-100 px-5 transition text-red-600 duration-500 hover:text-white hover:bg-main py-1 rounded-full">
            <p className="font-extrabold text-lg">
              Ir a tienda
          </p>
          </button>
        </Link>
      </div>
    </div>
  </div>;
};

export default StoreDiscountCard;