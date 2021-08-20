import santander from '../assets/images/santander.png';
import efectivo from '../assets/images/efectivo.png';
import { Link, useParams } from 'react-router-dom';
import whatsapp from '../assets/images/whatsapp.png';
import gmail from '../assets/images/gmail.png';

import pepsi from '../assets/images/pepsicola.jpg';
import cocacola from '../assets/images/cocacola.jpg';
import dorito from '../assets/images/doritos.jpg';

import { IoCloudUploadSharp, IoCartOutline, IoDocumentTextOutline, IoCloudDownloadSharp } from "react-icons/io5";
import UserAddressCard from '../components/UserAddressCard';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const Order = {

  ref: 'AASSDS25456',

  paidMethod: {
    name: 'Efectivo',
    image: efectivo,
  },

  bank: {
    image: santander,
    name: 'Santander',
    accountDetails: {
      accountType: 'Cuenta Unica',
      sucursal: '0175',
      cuenta: '12345-452',
      cbu: '12345678912345678912',
      alias: 'semidios.olimpo'
    }
  },

  statutes: [
    {
      id: 1,
      createdAt: new Date().toLocaleString(),
      name: 'En espera de pago.',
      color: 'orange'
    }
  ],

  createdAt: new Date().toLocaleString(),

  deliveryMethod: {
    id: 1,
    name: 'delivery'
  },

  products: [
    {
      image: pepsi,
      name: 'Pepsicola',
      price: 7.88,
      quantity: 5
    },
    {
      image: cocacola,
      name: 'CocaCola',
      price: 4.36,
      quantity: 5
    },
    {
      image: dorito,
      name: 'Doritos',
      price: 3.99,
      quantity: 5
    }
  ]
}

const OrderDetails = () => {

  const params = useParams();

  const { setLoading, setCustomAlert } = useAuth();

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

  return (
    <div className="p-8">
      <h1 className="text-4xl text-gray-500 font-bold">Detalles de la Orden</h1>

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
        <h2>Estado de la orden: <span className="px-4 py-1 capitalize rounded" style={{ backgroundColor: order?.orderStatus?.color }}>{order?.orderStatus?.name}</span></h2>
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
          <IoCartOutline className="mr-2" />  Productos <span className=" ml-4 border rounded-full h-[38px] w-[40px] text-center">{Order.products.length}</span>
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
    </div >
  )
}

export default OrderDetails;