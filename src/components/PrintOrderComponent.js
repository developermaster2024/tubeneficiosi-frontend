import { useRef } from "react";
import Button from "./Button";
import { useReactToPrint } from 'react-to-print';
import { useAuth } from "../contexts/AuthContext";



const PrintOrderComponent = ({ order, togglePrintMode }) => {

    const { setLoading, setCustomAlert } = useAuth();

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => setLoading?.({ show: true, message: "Generando documento" }),
        onAfterPrint: () => setLoading?.({ show: false, message: "" }),
        documentTitle: `Order - ${order?.orderNumber}`,
        pageStyle: `
        
          
          @media print {
            html, body {
              height: initial !important;
              overflow: initial !important;
              -webkit-print-color-adjust: exact;
            }
          }
          
          @media print {
            .page-break {
              margin-top: 1rem;
              display: block;
              page-break-before: auto;
            }
          }
          
          @page {
            size: auto;
            margin: 7mm;
          }
      `
    });

    return (
        <div className="animate__animated animate__fadeIn text-gray-500">
            <div ref={componentRef}>
                <div className="bg-white p-8 text-gray-500">
                    <h1 className="text-center text-3xl my-1">
                        Orden de Compra
                    </h1>
                    <div className="mb-2 flex justify-between">
                        <div>
                            <img className="m-auto" style={{ height: 60, width: 60 }} src={`${process.env.REACT_APP_API_URL}/${order?.store?.storeProfile?.logo}`} alt="" />
                            <p>{order?.store?.name}</p>
                        </div>
                        <div>
                            <p>Fecha: {order?.createdAt}</p>
                        </div>
                    </div>

                    <div className="flex space-x-4" container>
                        <div className="w-1/2">
                            <div className="mb-1">
                                <b>Nro de orden:</b> {order?.orderNumber}
                            </div>
                            <div className="mb-1">
                                <b>Nombre del cliente:</b> {order?.user?.name}
                            </div>
                            <div className="mb-1">
                                <b>Metodo de pago:</b> <span style={{ textTransform: "capitalize" }}>{order?.paymentMethod?.name}</span>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="mb-1">
                                <b>Dirección de envio:</b> {order?.delivery?.profileAddress?.address ? order?.delivery?.profileAddress?.address : "Retira en tienda."}
                            </div>
                            <div className="mb-1">
                                <b>Empresa de envio:</b> {order?.deliveryMethod?.name ? order?.deliveryMethod?.name : "Retiro en tienda."}
                            </div>
                            <div className="mb-1">
                                <b>Costo de envio:</b> {order?.delivery?.total > 0 ? `$${order?.delivery?.total}` : "Gratis"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl mb-4 font-bold text-center">
                            Detalle de orden
                        </h2>
                        <table style={{ borderSpacing: 10 }} className="w-full">
                            <tbody>
                                <tr className="border-b">
                                    <th>
                                        <div className="text-center">
                                            Nombre
                                        </div>
                                    </th>
                                    <th>
                                        <div className="text-center">
                                            Imagen
                                        </div>
                                    </th>
                                    <th>
                                        <div className="text-center">
                                            Precio
                                        </div>
                                    </th>
                                    <th>
                                        <div className="text-center">
                                            Cantidad
                                        </div>
                                    </th>
                                    <th>
                                        <div className="text-center">
                                            Total
                                        </div>
                                    </th>
                                </tr>
                                {
                                    order?.cart?.cartItems?.map((product, i) => {
                                        return (
                                            <>
                                                <tr className={`border-b`} key={i}>
                                                    <td style={{ padding: i === 4 && order?.cart?.cartItems.length > 5 ? "1rem 1rem 2.5rem 1rem" : "1rem" }}>
                                                        <div className="text-center">
                                                            {product.productName}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: i === 4 && order?.cart?.cartItems.length > 5 ? "1rem 1rem 2.5rem 1rem" : "1rem" }}>
                                                        <div className="text-center">
                                                            <img className="m-auto" style={{ width: 80, height: 80 }} src={`${process.env.REACT_APP_API_URL}/${product.productImage}`} alt="" />
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: i === 4 && order?.cart?.cartItems.length > 5 ? "1rem 1rem 2.5rem 1rem" : "1rem" }}>
                                                        <div className="text-center">
                                                            ${product.productPrice}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: i === 4 && order?.cart?.cartItems.length > 5 ? "1rem 1rem 2.5rem 1rem" : "1rem" }}>
                                                        <div className="text-center">
                                                            {product.quantity}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: i === 4 && order?.cart?.cartItems.length > 5 ? "1rem 1rem 2.5rem 1rem" : "1rem" }}>
                                                        <div className="text-center">
                                                            ${product.total}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                <tr>
                                    <th className="p-4" colSpan={5}>
                                        <div className="text-right">
                                            <b>Total:</b> <span className="text-green-500">${order?.cart?.subTotal}</span>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <table style={{ tableLayout: "fixed" }} className="mt-8 w-full">
                        <tbody>
                            <tr>
                                <td colSpan={1} className="text-center">
                                    <div className="text-center">
                                        <p>Telefono:</p>
                                        {order?.store?.phoneNumber}
                                    </div>
                                </td>
                                <td colSpan={1}>
                                    <div className="text-center">
                                        <p>Dirección:</p>
                                        {order?.store?.address}
                                    </div>
                                </td>
                                <td colSpan={1}>
                                    <div className="text-center" style={{ overflow: "hidden" }}>
                                        <p>Redes Sociales:</p>
                                        <div>
                                            <p><b>Instagram</b></p>
                                            {order?.store?.storeProfile?.instagram}
                                        </div>
                                        <div>
                                            <p><b>Facebook</b></p>

                                            {order?.store?.storeProfile?.facebook}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>


            <div className="text-center space-x-2 mt-4">
                <Button className="bg-main" onClick={togglePrintMode}>
                    Cancelar
                </Button>
                <Button className="bg-main items-center" onClick={handlePrint}>
                    <span>Imprimir</span>
                </Button>
            </div>
        </div>
    )
}

export default PrintOrderComponent;