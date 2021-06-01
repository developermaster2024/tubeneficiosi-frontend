import clsx from "clsx";
import { useState } from "react";
import { IoChevronDownOutline, IoEye, IoCloseSharp, IoStorefrontSharp, IoChevronUp, IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyAccountCartsTable = (props) => {

  const { carts, className } = props;

  const [showDetails, setShowDetails] = useState(null);
  const [tableCarts, setTableCarts] = useState(carts);

  const showDetailsCart = (i) => {
    if (showDetails === i) {
      setShowDetails(null);
      return;
    }

    setShowDetails(i);
  }

  const deleteCart = (i) => {

  }

  return (
    <div>
      <div className={className}>
        <div className="flex w-full text-center items-center font-bold">
          <div className="w-3/12 p-2">
            <p>ID</p>
            <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
          </div>
          <div className="w-3/12 p-2">
            <p>Tienda</p>
            <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
          </div>
          <div className="w-3/12 p-2">
            Fecha de Creacion
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
          </div>
          <div className="w-3/12 p-2">
            <p>Total</p>
            <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
          </div>
          <div className="w-3/12 p-2">
            <button className="bg-main text-white font-bold px-8 py-2 rounded transition duration-500 hover:bg-gray-200 hover:text-main">
              Buscar
            </button>
          </div>
        </div>
        <div className="w-full text-center">
          {
            tableCarts.map((cart, i) =>
              <div className="bg-white my-4 p-6 rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="w-3/12">
                    {cart.id}
                  </div>
                  <div className="w-3/12">
                    <Link to={`/stores/${cart.store.slug}`} className="text-blue-500">
                      <img className="w-[50px] m-auto" src={cart.store.image} alt="" />
                      <p>{cart.store.name}</p>
                    </Link>
                  </div>
                  <div className="w-3/12">
                    {cart.createdAt.toLocaleString()}
                  </div>
                  <div className="w-3/12 font-bold text-gray-500">
                    {cart.currency.code} {cart.products.reduce((total, product) => total + product.price, 0)}
                  </div>
                  <div className="w-3/12 flex justify-center items-center text-gray-400">
                    <Link to={`/stores/${cart.store.slug}`}>
                      <IoStorefrontSharp className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoStorefrontSharp>
                    </Link>
                    {
                      showDetails === i ?
                        <IoChevronUp onClick={() => { showDetailsCart(i) }} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoChevronUp>
                        :
                        <IoChevronDownOutline onClick={() => { showDetailsCart(i) }} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoChevronDownOutline>
                    }
                  </div>
                </div>
                <div className={clsx(["w-full animate__animated animate__zoomIn bg-white border-gray-300 border-t mt-4", {
                  'hidden': showDetails != i
                }])}>
                  {
                    cart.products.map((product, i) =>
                      <div className="flex items-center my-4 text-gray-400 text-md">
                        <div className="w-2/12">
                          <IoCloseSharp onClick={() => { deleteCart(i) }} className="cursor-pointer hover:text-main m-auto text-4xl text-main"></IoCloseSharp>
                        </div>
                        <div className="w-3/12">
                          <p>{product.name}</p>
                        </div>
                        <div className="w-3/12">
                          <img className="w-[60px] m-auto rounded" src={product.image} alt="" />
                        </div>
                        <div className="w-2/12">
                          {product.quantity}
                        </div>
                        <div className="w-2/12">
                          {cart.currency.code} {product.price}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>

            )
          }
        </div>
      </div>
    </div>
  )
}

export default MyAccountCartsTable;