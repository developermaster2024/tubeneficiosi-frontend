import { UserOrders } from '../../util/user-orders';
import OrdersTable from '../../components/OrdersTable';
import { IoDocumentTextSharp } from "react-icons/io5";
import Pagination from '../../components/Pagination';
import { useState } from 'react';
const MyAccountOrders = () => {

  const [activePage, setActivePage] = useState(1);



  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoDocumentTextSharp className="text-4xl"></IoDocumentTextSharp>
        <span className="ml-4">Mis Pedidos</span>
      </h1>

      <OrdersTable orders={UserOrders} className="w-full my-12 text-gray-500 text-center" />

      <Pagination pages={10} activePage={activePage} onChange={setActivePage}></Pagination>

    </div>
  )
}

export default MyAccountOrders;