import { UserOrders } from '../../util/user-orders';
import OrdersTable from '../../components/OrdersTable';

const MyAccountOrders = () => {
  return (
    <div className="px-8">
      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Mis Pedidos
      </h1>

      <OrdersTable orders={UserOrders} className="w-full my-12 text-gray-500 text-center" />

    </div>
  )
}

export default MyAccountOrders;