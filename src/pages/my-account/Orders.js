import { UserOrders } from '../../util/user-orders';
import OrdersTable from '../../components/OrdersTable';
import { IoDocumentTextSharp } from "react-icons/io5";
const MyAccountOrders = () => {
  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoDocumentTextSharp className="text-4xl"></IoDocumentTextSharp>
        <span className="ml-4">Mis Pedidos</span>
      </h1>

      <OrdersTable orders={UserOrders} className="w-full my-12 text-gray-500 text-center" />

    </div>
  )
}

export default MyAccountOrders;