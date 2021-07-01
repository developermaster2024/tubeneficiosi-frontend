import santander from '../assets/images/santander.png';
import efectivo from '../assets/images/efectivo.png';
import { Link } from 'react-router-dom';
import whatsapp from '../assets/images/whatsapp.png';
import gmail from '../assets/images/gmail.png';

import pepsi from '../assets/images/pepsicola.jpg';
import cocacola from '../assets/images/cocacola.jpg';
import dorito from '../assets/images/doritos.jpg';

import { IoCloudUploadSharp, IoCartOutline, IoDocumentTextOutline, IoCloudDownloadSharp } from "react-icons/io5";
import UserAddressCard from '../components/UserAddressCard';

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
  return (
    <div className="p-8">
      <h1 className="text-4xl text-gray-500 font-bold">Detalles de la Orden</h1>

      {/*Referencia. */}
      <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
        Referencia de la orden <span className="font-bold">{Order.ref}</span> - Realizado el {Order.createdAt}
      </div>

      {/*Tipo de envio y tipo de pago. */}
      <div className="bg-white rounded text-xl p-4 my-4 text-gray-500">
        <p className="my-2">Metodo de Envio: <span className="font-bold">{Order.deliveryMethod.name}</span></p>
        <p className="my-2">Metodo de Pago: <span className="font-bold">{Order.paidMethod.name}</span></p>
      </div>

      {/*Informacion de Pago */}
      <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
        Por favor Haga un deposito a la cuenta:
        <h2 className="text-2xl flex items-center justify-center">
          <img src={Order.bank.image} className="w-1/12" alt="" />
          <span>{Order.bank.name}</span>
        </h2>
        <div className="flex w-full flex-wrap">

          {/* TIPO DE CUENTA */}
          <div className="my-4 w-1/2 text-center">
            <h3 className="font-bold text-gray-700">Tipo de cuenta:</h3>
          </div>
          <div className="my-4 w-1/2 text-center">
            <p>{Order.bank.accountDetails.accountType}</p>
          </div>

          {/* SUCURSAL */}
          <div className="my-4 w-1/2 text-center">
            <h3 className="font-bold text-gray-700">Sucursal:</h3>
          </div>
          <div className="my-4 w-1/2 text-center">
            <p>{Order.bank.accountDetails.sucursal}</p>
          </div>

          {/* CUENTA */}
          <div className="my-4 w-1/2 text-center">
            <h3 className="font-bold text-gray-700">Cuenta:</h3>
          </div>
          <div className="my-4 w-1/2 text-center">
            <p>{Order.bank.accountDetails.cuenta}</p>
          </div>

          {/* CBU */}
          <div className="my-4 w-1/2 text-center">
            <h3 className="font-bold text-gray-700">CBU:</h3>
          </div>
          <div className="my-4 w-1/2 text-center">
            <p>{Order.bank.accountDetails.cbu}</p>
          </div>

          {/* CBU */}
          <div className="my-4 w-1/2 text-center">
            <h3 className="font-bold text-gray-700">Alias:</h3>
          </div>
          <div className="my-4 w-1/2 text-center">
            <p>{Order.bank.accountDetails.alias}</p>
          </div>
        </div>
        <p className="my-6">Especifique la referencia de su pedido <span className="font-bold">{Order.ref}</span> en la descripción del comprobante.</p>

        <p className="text-sm">También le enviamos esta información por correo electrónico.</p>

        <p className="text-sm">Su pedido será enviado tan pronto como <span className="font-bold">recibamos el pago.</span></p>

        <p className="text-sm">El pedido sera resguardo durante <span className="font-bold">20 días</span> luego de pasar los <span className="font-bold">20 días</span> los producto serán devueltos al stock de la tienda.</p>

        <p className="my-6 text-sm">Si tiene preguntas, comentarios o inquietudes, comuníquese con nuestro equipo experto de <Link className="text-blue-500" to={'/#'}>atención al cliente.</Link ></p>



        <h1>
          Puede enviarnos el comprobante por los siguientes canales:
        </h1>
        <div className="flex justify-between items-center mt-4">
          <div className="w-6/12">
            <div className="flex flex-wrap rounded-xl bg-gray-100 p-4 my-4 cursor-pointer transform transition duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2">
              <img className="h-[80px]" src={whatsapp} alt="" />
              <div className="w-2/3 ml-4">
                <h1 className="font-bold">Whatsapp</h1>
                <p>+54 9 11 2391-6734</p>
              </div>
            </div>
            <div className="flex flex-wrap rounded-xl bg-gray-100 p-4 my-4 cursor-pointer transform transition duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2">
              <img className="h-[80px]" src={gmail} alt="" />
              <div className="w-2/3 ml-4">
                <h1 className="font-bold">Beneficio Si</h1>
                <p>Beneficiosi2019@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="w-6/12 h-full text-center">
            <button className="bg-main text-white p-24 rounded-lg text-center text-2xl transition duration-500 hover:bg-gray-100 hover:text-main hover:shadow-xl">
              <IoCloudUploadSharp className="m-auto" />
              Subir Comprobante
            </button>
          </div>
        </div>
      </div>

      {/*Historial de Orden */}
      <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
        <h1>Historial de la orden:</h1>
        <div className="flex flex-wrap mt-6">
          <div className="w-4/12">
            <span>Fecha</span>
          </div>
          <div className="w-4/12">
            <span>Estado</span>
          </div>
        </div>

        {
          Order.statutes.map((status, i) => {
            return (
              <div className="flex flex-wrap mt-6">
                <div className="w-4/12">
                  <span>{status.createdAt}</span>
                </div>
                <div className="w-4/12">
                  <span style={{ background: status.color }} className="text-white px-4">{status.name}</span>
                </div>
              </div>
            )
          })
        }
      </div>


      {/*Direccion de Envio */}
      <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
        <div className="flex flex-wrap">
          <div className="w-1/2">
            <h1>Direccion de envio:</h1>
            <UserAddressCard
              className="m-4 min-h-64 cursor-pointer border hover:shadow-xl hover:border-none relative w-80 bg-white rounded text-gray-500 p-8 transition duration-500"
              name={'Mi Casa'}
              address={'ro B, Valentín Virasoro 927, 1405 CABA, Argentina'}
              latLng={{ lat: -121545231, lng: 212345642 }} />
          </div>
          <div className="w-1/2">
            <h1>Direccion de facturacion:</h1>
            <UserAddressCard
              className="m-4 min-h-64 cursor-pointer border hover:shadow-xl hover:border-none relative w-80 bg-white rounded text-gray-500 p-8 transition duration-500"
              name={'Mi Casa'}
              address={'ro B, Valentín Virasoro 927, 1405 CABA, Argentina'}
              latLng={{ lat: -121545231, lng: 212345642 }} />
          </div>
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
              Order.products.map((product, i) => {
                return (
                  <tr>
                    <th>
                      <img className="w-[70px] h-[70px] m-auto" src={product.image} alt="" />
                    </th>
                    <th>
                      {product.name}
                    </th>
                    <th>
                      $ {product.price}
                    </th>
                    <th>
                      {product.quantity}
                    </th>
                    <th>
                      $ {(product.price * product.quantity).toFixed(2)}
                    </th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="text-right my-8 px-8">
          <p className="my-4"><span className="font-bold">Productos:</span> $ {Order.products.reduce((total, product) => (product.price * product.quantity) + total, 0)}</p>
          <p className="my-4"><span className="font-bold">Envio:</span> $ 500.45</p>
          <p className="my-4"><span className="font-bold">Total:</span> $ {(Order.products.reduce((total, product) => (product.price * product.quantity) + total, 0) + 500.45)}</p>
        </div>
      </div>

      <div className="bg-white rounded text-lg p-4 my-4 text-gray-500">
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
          <div className="flex items-center my-4">
            <IoDocumentTextOutline />
            <p>Factura:</p>
            <span className="ml-4 cursor-pointer text-main">
              descargar <IoCloudDownloadSharp className="inline" />
            </span>
          </div>
          <div className="flex items-center my-4">
            <IoDocumentTextOutline />
            <p>Albaran de entrega:</p>
            <span className="ml-4 cursor-pointer text-main">
              descargar <IoCloudDownloadSharp className="inline" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails;