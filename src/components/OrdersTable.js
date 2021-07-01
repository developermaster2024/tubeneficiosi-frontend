import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";

const OrdersTable = (props) => {

  const { orders, className } = props;

  console.log(orders);

  return (
    <div className={className}>
      <div className="flex w-full items-center font-bold">
        <div className="w-1/12 p-2">
          Referencia
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-2/12 p-2">
          Direccion
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-1/12 p-2">
          Tienda
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-1/12 p-2">
          Total
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-2/12 p-2">
          Fecha
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-2/12 p-2">
          <p>Estado</p>
          <select type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            <option value="">En proceso de pago</option>
            <option value="">Pago aceptado</option>
            <option value="">En proceso de envio</option>
            <option value="">Finalizada</option>
            <option value="">Error en pago</option>
          </select>
        </div>
        <div className="w-2/12 p-2">
          Pago
          <select type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            <option value="">Efectivo</option>
            <option value="">Transferencia Bancaria</option>
            <option value="">Mercadopago</option>
          </select>
        </div>
        <div className="w-1/12 p-2">
          <button>
            Buscar
            </button>
        </div>
      </div>
      <div className="w-full text-center">
        {
          orders.map((order, i) => <div className="flex bg-white my-4 p-6 items-center rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
            <div className="w-1/12">
              {order.ref}
            </div>
            <div className="w-2/12">
              {order.client.address.address}
            </div>
            <div className="w-1/12">
              <Link to={`/stores/${order.store.slug}`} className="text-blue-500">
                {order.store.name}
              </Link>
            </div>
            <div className="w-1/12">
              {order.currency.symbol} {order.total}
            </div>
            <div className="w-2/12">
              {order.createdAt.toLocaleString()}
            </div>
            <div className="w-2/12 text-white rounded-lg p-2 font-bold bg-opacity-10" style={{ backgroundColor: order.statutes[0].color }} >
              {order.statutes[0].name}
            </div>
            <div className="w-2/12">
              {order.paidMethod.name}
            </div>
            <div className="w-1/12">
              <Link to={'/orders/12h3j1h'}>
                <IoEye className="m-auto text-2xl cursor-pointer hover:text-main transition duration-300"></IoEye>
              </Link>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default OrdersTable;