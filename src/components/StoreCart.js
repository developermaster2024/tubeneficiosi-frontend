import {
  IoCartOutline,
  IoArrowForwardOutline,
  IoTrashSharp
} from "react-icons/io5";

import burger from '../assets/images/hamburguesa.jpg';

const StoreCart = (props) => {

  const { show, closeCart } = props;

  return (
    <div hidden={!show} className="fixed h-full w-full bg-black bg-opacity-50 top-0 left-0 z-[3] text-white animate__animated animate__fadeIn">
      <div className="ml-auto w-3/12 h-full bg-white text-gray-600 p-4 animate__animated animate__fadeInRight">
        <IoArrowForwardOutline onClick={closeCart} className="text-2xl text-main cursor-pointer transition duration-500 transform hover:scale-150" />
        <div className="flex items-center text-2xl my-4">
          <IoCartOutline />
          <p className="ml-2">Mi Carrito</p>
        </div>

        <div className="border-b">
          <p className="flex text-main w-full items-center text-lg cursor-pointer">
            <span className="ml-auto">Eliminar todo</span>
            <IoTrashSharp />
          </p>
        </div>
        <div className="h-[60vh] overflow-y-auto px-4">
          {
            Array.from(Array(5).keys()).splice(1).map((n) => {
              return (
                <div className="my-4">
                  <p className="text-right mb-2">$ 4,58</p>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 flex items-center">
                      <img src={burger} className="rounded-full h-12 w-12" alt="" />
                      <div className="ml-2">
                        <h3>Hamburguesa</h3>
                        <p>$ 2.69</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 text-main w-12 flex rounded">
                      <p className="m-auto">2</p>
                    </div>
                    <div className="rounded border border-main w-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
                      <IoTrashSharp className="m-auto"></IoTrashSharp>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="border-t mt-2">
          <div className="flex justify-between text-gray-400 my-4">
            <span>Descuento</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-gray-400 my-4">
            <span>Sub total</span>
            <span>$ 21,03</span>
          </div>
        </div>

        <div className="text-center my-6">
          <button className="px-6 py-2 bg-main rounded w-8/12 text-white font-bold text-xl transition duration-300 hover:text-main hover:bg-gray-100">
            Pagar
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoreCart;