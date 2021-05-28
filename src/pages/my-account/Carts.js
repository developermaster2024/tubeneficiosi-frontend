import { useState } from "react";
import { IoCart } from "react-icons/io5";
import MyAccountCartsTable from "../../components/MyAccountCartsTable";
import Pagination from "../../components/Pagination";
import { UserCarts } from '../../util/user-carts';

const MyAccountCarts = () => {

  const [activePage, setActivePage] = useState(1);

  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoCart className="text-4xl"></IoCart>
        <span className="ml-4">Mis Carritos</span>
      </h1>

      <MyAccountCartsTable className="my-12" carts={UserCarts}></MyAccountCartsTable>

      <Pagination pages={10} activePage={activePage} onChange={setActivePage} />
    </div>
  )
}

export default MyAccountCarts;