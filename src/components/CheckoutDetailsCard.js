import { useEffect, useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import useAxios from "../hooks/useAxios";
import clsx from "clsx";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CheckoutDetailsCard = ({ cartId, canBuy, emitCart }) => {

    const { setLoading, setCustomAlert } = useAuth();

    const [productToDelete, setProductToDelete] = useState(null);

    const [cart, setCart] = useState(null);

    const [{ data, error: cartError, loading: cartLoading }, getCart] = useAxios({ url: `/carts/${cartId}` }, { useCache: false, manual: true });

    const [{ data: deleteData, error: deleteError, loading: deleteLoading }, deleteProductCart] = useAxios({ url: `/carts/${cart?.id}/cart-items/${productToDelete?.id}`, method: "DELETE" }, { useCache: false, manual: true });

    useEffect(() => {
        if (cartId) {
            getCart();
        }
    }, [cartId]);

    useEffect(() => {
        if (deleteData !== undefined) {
            console.log(deleteData);
            setCustomAlert({ show: true, message: "Se ha eliminado el producto exitosamente.", severity: "success" });
            setCart((oldCart) => {
                return {
                    ...oldCart,
                    ...deleteData
                }
            })
        }
    }, [deleteData])

    useEffect(() => {
        setLoading({ show: deleteLoading, message: "Eliminando el producto" });
    }, [deleteLoading]);

    useEffect(() => {
        if (productToDelete) {
            deleteProductCart();
        }
    }, [productToDelete]);

    useEffect(() => {
        if (cartError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "cartError" });
        }

        if (deleteError) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${deleteError?.response?.status === 400 ? deleteError?.response?.data.message[0] : deleteError?.response?.data.message}.`, severity: "cartError" });
        }
    }, [cartError, deleteError]);

    useEffect(() => {
        if (cart) {

            emitCart(cart)
        }
    }, [cart])

    useEffect(() => {
        if (data) {
            setCart(data);
        }
    }, [data]);

    const handleDelete = (product) => {
        setProductToDelete(product);
    }

    return (
        <>
            {
                cartLoading ?
                    <div className="h-56 w-full flex">
                        <span className="m-auto">Cargando...</span>
                    </div>
                    :
                    <div className="bg-white rounded p-8">
                        <h1 className="text-2xl my-4 border-b">Detalle de la Orden</h1>
                        <div style={{ maxHeight: "40vh" }} className="custom-scrollbar overflow-y-auto px-4">
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
                                <span>Envio</span>
                                <span>$0</span>
                            </div>
                            <div className="flex justify-between text-gray-400 my-4">
                                <span>Sub total</span>
                                <span>$ {cart?.subTotal}</span>
                            </div>
                            <div className="px-8 text-center mt-6">
                                <button className={clsx(["text-center text-2xl px-14 py-2 rounded text-white"], {
                                    'bg-red-500': canBuy,
                                    'bg-red-100': !canBuy
                                })} disabled>
                                    Hacer Pedido
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default CheckoutDetailsCard;