import { Link } from "react-router-dom";
const BankDiscountCard = ({ bankDiscount }) => {

  return <div
    className="bg-white flex align-center p-3 rounded-lg"
  >
    <div className="w-3/12 text-center p-1">
      <img className="m-auto w-1/2 text-center" src={bankDiscount.store.img} alt={bankDiscount.store.name} />
      <p className="text-gray-700 font-semibold text-center break-words">
        {bankDiscount.store.name}
      </p>
    </div>
    <div className="w-6/12 text-center border-r border-l border-gray">
      <p className="text-4xl text-bold">
        {bankDiscount.discount}
      </p>
      <p className="text-xs">Descuento</p>
      <Link to={bankDiscount.link}>
        <button className="mt-2 bg-red-100 px-5 transition text-red-600 duration-500 hover:text-white hover:bg-main py-1 rounded-full">
          <p className="font-extrabold text-lg">
            Ir a tienda
          </p>
        </button>
      </Link>
    </div>
    <div className="w-3/12 text-right">
      <div className="text-main">
      </div>
      <div className="mt-2">
        <img className="m-auto w-1/2 text-center" src={bankDiscount.bank.img} alt={bankDiscount.bank.name} />
        <p className="text-gray-700 font-semibold text-center break-words">
          {bankDiscount.bank.name}
        </p>
      </div>
    </div>
  </div>;
};

export default BankDiscountCard;