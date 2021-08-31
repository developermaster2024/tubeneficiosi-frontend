import { useEffect, useState } from "react";
import { IoTrashSharp, IoLocationSharp } from "react-icons/io5";
import useAxios from "../hooks/useAxios";
import clsx from "clsx";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "./Button";

const CheckoutDetailsCard = ({ cartId, canBuy, emitCart, loadingDeliveryCost, deliveryCost, onBuy }) => {

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
            console.log(cart)
            emitCart(cart)
        }
    }, [cart])

    useEffect(() => {
        if (data) {
            if (!data.isProcessed) {
                setCart(data);
            }
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
                    <>
                        <div className="bg-white  p-4 rounded mb-4  text-gray-500">
                            <div className="justify-between flex items-center">
                                <Link className="text-center hover:text-main" to={`/stores/${cart?.store?.slug}`}>
                                    <img className="w-12 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${cart?.store?.storeProfile?.logo}`} alt={cart?.store?.name} />
                                    <h3 className="text-xl">{cart?.store?.name}</h3>
                                </Link>
                                <Button className="bg-green-500">
                                    Abierta
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <IoLocationSharp className="text-4xl" />
                                <p>{cart?.store?.address}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded p-8">
                            {
                                data?.isProcessed ?
                                    <div className="text-red-500">
                                        <p>
                                            El carrito obtenido ya ha sido procesado.
                                            Si desea puede crear otro comprando uno de los productos.
                                        </p>
                                        <div className="text-center my-4">
                                            <Link to={`/products`}>
                                                <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                    Ir a comprar
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <h1 className="text-2xl my-4 border-b">Detalle de la Orden</h1>
                                        <div style={{ maxHeight: "40vh" }} className="custom-scrollbar overflow-y-auto px-4">
                                            {
                                                cart?.cartItems?.length > 0 ?
                                                    cart?.cartItems?.map((product, n) => {
                                                        return (
                                                            <div key={n} className="my-4">
                                                                <p className="text-right mb-2">$ {product?.total}</p>
                                                                <div className="flex justify-between items-center w-full">
                                                                    <div className="w-1/2 flex items-center">
                                                                        <img src={`${process.env.REACT_APP_API_URL}/${product?.productImage}`} className="rounded-full h-12 w-12" alt="" />
                                                                        <div className="ml-2">
                                                                            <h3>{product?.productName}</h3>
                                                                            <b className="text-main">$ {product?.productPrice}</b>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-gray-100 text-main w-12 h-12 flex rounded">
                                                                        <p className="m-auto">{product.quantity}</p>
                                                                    </div>
                                                                    <div onClick={() => { handleDelete(product) }} className="rounded border border-main w-12 h-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
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
                                                <span>{loadingDeliveryCost ? "Calculando costo de envio" : `$${deliveryCost}`}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400 my-4">
                                                <span>Sub total</span>
                                                <span>$ {cart?.subTotal}</span>
                                            </div>
                                            <div className="px-8 text-center mt-6">
                                                <button className={clsx(["text-center text-2xl px-14 py-2 rounded text-white"], {
                                                    'bg-red-500': canBuy,
                                                    'bg-red-100': !canBuy
                                                })} disabled={!canBuy} onClick={onBuy}>
                                                    Hacer Pedido
                                                </button>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </>
            }
        </>

    )
}

export default CheckoutDetailsCard;