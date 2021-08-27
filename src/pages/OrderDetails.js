import { useParams } from 'react-router-dom';

import { IoCartOutline, IoDocumentTextOutline, IoCloudDownloadSharp } from "react-icons/io5";
import useAxios from '../hooks/useAxios';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import PrintOrderComponent from '../components/PrintOrderComponent';
import Button from '../components/Button';

const OrderDetails = () => {

  const params = useParams();

  const { setLoading, setCustomAlert } = useAuth();

  const [showPrintMode, setShowPrintMode] = useState(false);

  const [{ data: order, error: orderError, loading: orderLoading }, getOrder] = useAxios({ url: `/orders/${params?.id}` }, { useCache: false });

  useEffect(() => {
    if (orderError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${orderError?.response?.status === 400 ? orderError?.response?.data.message[0] : orderError?.response?.data.message}.`, severity: "error" });
    }
  }, [orderError]);

  useEffect(() => {
    setLoading?.({ show: orderLoading, message: "Obteniendo informacion del pedido" });
  }, [orderLoading])

  useEffect(() => {
    if (order) {
      console.log(order);
    }
  }, [order]);

  const togglePrintMode = () => {
    setShowPrintMode((oldPrintMode) => !oldPrintMode);
  }

  return (
    <div className="p-8">
      {
        showPrintMode ?
          <PrintOrderComponent togglePrintMode={togglePrintMode} order={order} />
          :
          <>
            <h1 className="text-4xl text-gray-500 font-bold">Detalles de la Orden</h1>

            <div className="text-right">
              <Button className="bg-main text-white" onClick={togglePrintMode}>
                Imprimir
              </Button>
            </div>

            {/*Referencia. */}
            <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
              Referencia de la orden <span className="font-bold">{order?.orderNumber}</span> - Realizado el {order?.createdAt}
            </div>

            {/*Tipo de envio y tipo de pago. */}
            <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
              <div className="flex items-center space-x-2">
                <p className="my-2">Metodo de Envio: <b>{order?.deliveryMethod?.name}</b></p>
                {
                  order?.deliveryMethod?.imgPath &&
                  <img className="w-12 h-12 rounded" src={`${process.env.REACT_APP_API_URL}/${order?.deliveryMethod?.imgPath}`} />
                }
              </div>

              <div className="flex items-center space-x-2">
                <p className="my-2">Metodo de Pago: <b className="capitalize">{order?.paymentMethod?.name}</b></p>
                {
                  order?.deliveryMethod?.imgPath &&
                  <img className="w-12 h-12 rounded" src={`${process.env.REACT_APP_API_URL}${order?.paymentMethod?.imgPath}`} />
                }
              </div>
            </div>

            {/*Informacion de Pago */}
            <div className="bg-white rounded text-lg p-8 my-4 text-gray-500">
              <h2>Estado de la orden: <span className="px-4 py-1 capitalize rounded text-white" style={{ backgroundColor: order?.orderStatus?.color }}>{order?.orderStatus?.name}</span></h2>
            </div>

            <div className="bg-white rounded text-lg p-8 my-4 text-gray-500 flex items-center space-x-4">
              <h2>Tienda:</h2>
              <div className="text-center">
                {
                  order?.store?.storeProfile?.logo &&
                  <img className="h-16 w-16" src={`${process.env.REACT_APP_API_URL}/${order?.store?.storeProfile?.logo}`} alt="" />
                }
                <p>
                  {order?.store?.name}
                </p>
              </div>
            </div>


            {/*Direccion de Envio */}
            <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
              <h1>Direccion de envio:</h1>
              <div className="flex items-center space-x-4">
                <p>
                  <b>{order?.delivery?.profileAddress?.name}</b> - {order?.delivery?.profileAddress?.address}
                </p>
              </div>
            </div>

            {/*Productos */}
            <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
              <h1 className="flex items-center text-2xl my-4">
                <IoCartOutline className="mr-2" />  Productos <span className=" ml-4 border rounded-full h-[38px] w-[40px] text-center">{order?.cart?.cartItems?.length}</span>
              </h1>

              <table className="w-2/3 text-center">
                <thead className="border-b">
                  <tr>
                    <th>
                      imagen
                    </th>
                    <th>
                      productos
                    </th>
                    <th>
                      Precio Unitario
                    </th>
                    <th>
                      Cantidad
                    </th>
                    <th>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    order?.cart?.cartItems?.map((product, i) => {
                      return (
                        <tr key={i}>
                          <th>
                            <img className="w-[70px] h-[70px] m-auto" src={`${process.env.REACT_APP_API_URL}/${product.productImage}`} alt="" />
                          </th>
                          <th>
                            {product.productName}
                          </th>
                          <th>
                            $ {product.total}
                          </th>
                          <th>
                            {product.quantity}
                          </th>
                          <th>
                            $ {(product.total * product.quantity).toFixed(2)}
                          </th>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

              <div className="text-right my-8 px-8">
                <p className="my-4"><span className="font-bold">Productos: </span>${order?.cart?.subTotal}</p>
                <p className="my-4"><span className="font-bold">Envio:</span> {order?.delivery?.total}</p>
                <p className="my-4"><span className="font-bold">Total:</span> $ {order?.total}</p>
              </div>
            </div>

            <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
              <h1>Datos de envio:</h1>
              {
                order?.orderStatus?.name === "enviada" ?
                  <table className="w-full text-center">
                    <thead className="border-b">
                      <tr>
                        <th>
                          Fecha
                        </th>
                        <th>
                          Transporte
                        </th>
                        <th>
                          Gastos de Envio
                        </th>
                        <th>
                          Tracking de Envio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>
                          {new Date().toLocaleString()}
                        </th>
                        <th>
                          Delivery
                        </th>
                        <th>
                          $ 150
                        </th>
                        <th>
                          5445454asd8
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  :
                  <div className="text-center text-red-500">
                    Esta orden aun no tiene información de envio.
                  </div>
              }
            </div>

            <div className="bg-white rounded text-lg p-8 my-4 text-gray-500">
              <h1 className="font-bold">
                Documentos:
              </h1>
              <div className="flex w-full justify-around">
                <div className="flex items-center my-4">
                  <IoDocumentTextOutline />
                  <p>Orden:</p>
                  <span className="ml-4 cursor-pointer text-main">
                    descargar <IoCloudDownloadSharp className="inline" />
                  </span>
                </div>
                {
                  order?.orderStatus?.name === "pagada" &&
                  <div className="flex items-center my-4">
                    <IoDocumentTextOutline />
                    <p>Factura:</p>
                    <span className="ml-4 cursor-pointer text-main">
                      descargar <IoCloudDownloadSharp className="inline" />
                    </span>
                  </div>
                }
                {
                  order?.orderStatus?.name === "enviada" &&
                  <div className="flex items-center my-4">
                    <IoDocumentTextOutline />
                    <p>Albaran de entrega:</p>
                    <span className="ml-4 cursor-pointer text-main">
                      descargar <IoCloudDownloadSharp className="inline" />
                    </span>
                  </div>
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default OrderDetails;