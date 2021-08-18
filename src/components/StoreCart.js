import { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoArrowForwardOutline,
  IoTrashSharp
} from "react-icons/io5";
import { Link } from "react-router-dom";

import burger from '../assets/images/hamburguesa.jpg';
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

const StoreCart = (props) => {

  const { setLoading, setCustomAlert } = useAuth();

  const { show, closeCart, cart, onChangeCart } = props;

  console.log(cart);

  const [productToDelete, setProductToDelete] = useState(null);

  const [{ data: deleteData, error: deleteError, loading: deleteLoading }, deleteProductCart] = useAxios({ url: `/carts/${cart?.id}/cart-items/${productToDelete?.id}`, method: "DELETE" }, { useCache: false, manual: true });

  useEffect(() => {
    if (deleteData !== undefined) {
      setCustomAlert({ show: true, message: "Se ha eliminado el producto exitosamente.", severity: "success" });
      onChangeCart({ ...cart, ...deleteData });
    }
  }, [deleteData]);

  useEffect(() => {
    setLoading({ show: deleteLoading, message: "Eliminando el producto" });
  }, [deleteLoading]);

  useEffect(() => {
    if (productToDelete) {
      deleteProductCart();
    }
  }, [productToDelete]);

  useEffect(() => {
    if (deleteError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "cartError" });
    }
  }, [deleteError]);

  const handleDelete = (product) => {
    setProductToDelete(product);
  }


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
            cart?.cartItems?.length > 0 ?
              cart?.cartItems?.map((product, n) => {
                return (
                  <div key={n} className="my-4">
                    <p className="text-right mb-2">$ {product?.total}</p>
                    <div className="flex justify-between w-full">
                      <div className="w-1/2 flex items-center">
                        <img src={`${process.env.REACT_APP_API_URL}/${product?.productImage}`} className="rounded-full h-12 w-12" alt="" />
                        <div className="ml-2">
                          <h3>{product?.productName}</h3>
                          <b className="text-main">$ {product?.productPrice}</b>
                        </div>
                      </div>
                      <div className="bg-gray-100 text-main w-12 flex rounded">
                        <p className="m-auto">{product.quantity}</p>
                      </div>
                      <div onClick={() => { handleDelete(product) }} className="rounded border border-main w-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
                        <IoTrashSharp className="m-auto"></IoTrashSharp>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div className="text-center">
                <p className="text-red-500 text-xl my-8">No hay productos</p>
                <Link to={`/products`} className="bg-main bg-main px-4 py-2 rounded text-white transition duration-500 hover:bg-gray-100 hover:text-main hover:shadow-xl">Ir a comprar</Link>
              </div>
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
            <Link to={'/checkout'}>
              Pagar
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoreCart;