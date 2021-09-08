import { useEffect, useRef, useState } from "react";
import { IoClose, IoEyeSharp } from "react-icons/io5";
import reactDom from "react-dom";
import useDiscounts from "../../hooks/useDiscounts";
import Button from "../Button";
import DiscountModal from "./DiscountModal";
import clsx from "clsx";

const StoreDiscountsModal = ({ storeAndProduct, onClose }) => {

    const modalRef = useRef();

    const [discountId, setDiscountId] = useState(null);

    const [discount, setDiscount] = useState(null);

    const [filters, setFilters] = useState({
        page: 1,
        isActive: true,
        storeIds: storeAndProduct?.storeId
    });

    const [{ discounts, error: discountsError, loading: discountsLoading }, getDiscounts] = useDiscounts({ axiosConfig: { params: { ...filters, storeIds: storeAndProduct?.storeId } }, options: { useCache: false, manual: true } });

    const [actualDiscount, setActualDiscounts] = useState([]);

    useEffect(() => {
        setActualDiscounts((oldActualDiscounts) => {
            return [...oldActualDiscounts, ...discounts];
        })
    }, [discounts])

    useEffect(() => {
        setActualDiscounts([]);
        getDiscounts({
            params: {
                ...filters,
                storeIds: storeAndProduct?.storeId,
            }
        })

    }, [storeAndProduct])

    const handleCloseModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const handleClose = () => {
        if (!discountId) {
            alert("Seleccione al menos un descuento.")
            return
        }
        const { discount, ...rest } = storeAndProduct;
        onClose({
            ...rest,
            discountId
        })
    }

    const handlePay = () => {
        const { discount, ...rest } = storeAndProduct;
        onClose(rest);
    }

    if (!storeAndProduct) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { onClose() }}>
                        <IoClose />
                    </button>
                </div>
                <div style={{ overflowY: "auto", height: "50vh" }} className="flex custom-scrollbar">
                    {discountsError ?
                        <div className="m-auto text-center space-y-4 space-x-4 text-red-500 text-xl">
                            <p>Ha ocurrido un error al obtener los decuentos.</p>
                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl" onClick={() => { getDiscounts({ params: { ...filters, storeIds: storeAndProduct?.storeId, } }) }}>
                                Reintentar
                            </Button>

                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl" onClick={() => { getDiscounts({ params: { ...filters, storeIds: storeAndProduct?.storeId, } }) }}>
                                Continuar sin descuentos
                            </Button>
                        </div>
                        :
                        discountsLoading ?
                            <div className="m-auto text-xl text-gray-500 font-bold">
                                Obteniendo descuentos...
                            </div>
                            :
                            actualDiscount.length > 0 ?
                                <div className="text-center w-full text-gray-500 mt-4 space-y-4 px-8">
                                    <p>
                                        Estos son los descuentos de la tienda puede seleccionar alguno si desea.
                                    </p>
                                    {
                                        actualDiscount?.map((discount, i) => {
                                            return (
                                                <div key={i} className="shadow-xl flex items-center p-4 justify-between">
                                                    <img className="w-10 h-10 rounded" src={`${process.env.REACT_APP_API_URL}/${discount?.imgPath}`} alt="" />
                                                    <p>
                                                        {discount.name}
                                                    </p>
                                                    {
                                                        discount?.discountType?.code === "dit-002" &&
                                                        <p className="text-main">En tarjetas seleccionadas.</p>
                                                    }

                                                    {
                                                        discount?.discountType?.code === "dit-001" &&
                                                        <p className="text-main">En Bancos seleccionados.</p>
                                                    }
                                                    <div>
                                                        {
                                                            discount?.discountType?.code === "dit-002" || discount?.discountType?.code === "dit-001" ?
                                                                <IoEyeSharp className="text-xl cursor-pointer" title="Ver información" onClick={() => { setDiscount(discount) }} />
                                                                :
                                                                null
                                                        }
                                                        <input className="flex-end text-main focus:ring-main cursor-pointer rounded-full " checked={discountId === discount.id} value={discount.id} onChange={() => { setDiscountId(discount.id) }} type="checkbox" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className="m-auto text-center text-xl text-gray-500 font-bold">
                                    <p>La tienda no posee descuentos...</p>

                                    <Button className="mt-2 bg-main" onClick={handlePay}>
                                        Ir a pagar
                                    </Button>
                                </div>

                    }
                </div>
                <div className="mb-4 text-center space-x-4">
                    <Button onClick={() => { onClose() }} className="bg-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                        Cancelar
                    </Button>
                    <Button onClick={handlePay} className="bg-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                        Continuar sin descuento
                    </Button>
                    <Button onClick={handleClose} className={clsx(["bg-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl"], {
                        "bg-opacity-50": !discountId
                    })}>
                        Ir a Pagar
                    </Button>
                </div>
            </div>
            <DiscountModal description={"Estas son las tarjetas con las que podes pagar para recibir este descuento."} hiddenStoreButton discount={discount} onClose={() => { setDiscount(null) }} />
        </div>
        ,
        document.getElementById("portal")
    );
}

export default StoreDiscountsModal;